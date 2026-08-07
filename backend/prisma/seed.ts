import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed from js/data.js...');

    // 1. Read data.js from the frontend
    const dataJsPath = path.join(__dirname, '../../js/data.js');
    const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

    // 2. Extract MOCK_DATA using a scoped function evaluation
    const scriptContent = dataJsContent.split('// --- Utility Functions ---')[0];
    const extractFn = new Function(scriptContent + '\nreturn MOCK_DATA;');
    const mockData = extractFn();

    // 3. Wipe existing data
    await prisma.activityLog.deleteMany({});
    await prisma.donation.deleteMany({});
    await prisma.medicine.deleteMany({});
    await prisma.case.deleteMany({});
    await prisma.nGOProfile.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('Database wiped.');

    const defaultPassword = await bcrypt.hash('password123', 10);

    // 4. Seed NGOs and their User accounts
    const ngoMap = new Map();
    for (const ngo of mockData.ngos) {
        // Create user
        const user = await prisma.user.create({
            data: {
                email: `contact@${ngo.id}.ong`,
                passwordHash: defaultPassword,
                role: 'NGO',
                isVerified: ngo.verified,
                createdAt: new Date(ngo.memberSince),
            }
        });

        // Create profile
        const profile = await prisma.nGOProfile.create({
            data: {
                id: ngo.id, // keep the same ID for relation linking
                userId: user.id,
                orgName: ngo.name,
                verificationStatus: ngo.verified,
                rating: ngo.rating,
                rescueStats: JSON.stringify({
                    totalRescues: ngo.totalRescues,
                    successRate: ngo.successRate,
                    avgResponseTime: ngo.avgResponseTime
                }),
                // Approximated locations for cities
                latitude: ngo.city === 'Mumbai' ? 19.0760 :
                    ngo.city === 'Bangalore' ? 12.9716 :
                        ngo.city === 'Jaipur' ? 26.9124 :
                            ngo.city === 'Kolkata' ? 22.5726 :
                                ngo.city === 'Delhi' ? 28.7041 :
                                    ngo.city === 'Pune' ? 18.5204 : 20.0,
                longitude: ngo.city === 'Mumbai' ? 72.8777 :
                    ngo.city === 'Bangalore' ? 77.5946 :
                        ngo.city === 'Jaipur' ? 75.7873 :
                            ngo.city === 'Kolkata' ? 88.3639 :
                                ngo.city === 'Delhi' ? 77.1025 :
                                    ngo.city === 'Pune' ? 73.8567 : 77.0,
            }
        });
        ngoMap.set(ngo.id, profile);
    }
    console.log(`Seeded ${mockData.ngos.length} NGOs.`);

    // 5. Seed Cases
    let casesSeeded = 0;
    for (const c of mockData.cases) {

        // Let's create a generic reporter user for these mock cases
        const reporter = await prisma.user.create({
            data: {
                email: `reporter_${c.id}@example.com`,
                passwordHash: defaultPassword,
                role: 'REPORTER',
                isVerified: true
            }
        });

        // Use approximate matched city locations for cases too
        const lat = c.city === 'Mumbai' ? 19.0760 + (Math.random() * 0.1) :
            c.city === 'Bangalore' ? 12.9716 + (Math.random() * 0.1) :
                c.city === 'Jaipur' ? 26.9124 + (Math.random() * 0.1) :
                    c.city === 'Kolkata' ? 22.5726 + (Math.random() * 0.1) :
                        c.city === 'Delhi' ? 28.7041 + (Math.random() * 0.1) :
                            c.city === 'Pune' ? 18.5204 + (Math.random() * 0.1) : 20.0;

        const lng = c.city === 'Mumbai' ? 72.8777 + (Math.random() * 0.1) :
            c.city === 'Bangalore' ? 77.5946 + (Math.random() * 0.1) :
                c.city === 'Jaipur' ? 75.7873 + (Math.random() * 0.1) :
                    c.city === 'Kolkata' ? 88.3639 + (Math.random() * 0.1) :
                        c.city === 'Delhi' ? 77.1025 + (Math.random() * 0.1) :
                            c.city === 'Pune' ? 73.8567 + (Math.random() * 0.1) : 77.0;

        await prisma.case.create({
            data: {
                id: c.id,
                reporterId: reporter.id,
                assignedNgoId: c.ngoAssigned || null,
                latitude: lat,
                longitude: lng,
                urgency: c.urgency.toUpperCase(),
                status: c.status === 'in-progress' ? 'IN_PROGRESS' : c.status.toUpperCase(),
                description: `[${c.animal}] ${c.title} - ${c.description}`,
                images: JSON.stringify(c.photos || []),
                createdAt: new Date(c.reportedAt),
            }
        });
        casesSeeded++;
    }
    console.log(`Seeded ${casesSeeded} Cases.`);

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
