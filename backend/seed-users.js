const bcrypt = require('./node_modules/bcrypt');
const {PrismaClient} = require('./node_modules/@prisma/client');
const p = new PrismaClient();

async function seed() {
  const accounts = [
    { email: 'reporter@ngoconnect.com', password: 'Reporter@123', role: 'REPORTER', name: 'Demo Reporter' },
    { email: 'ngo@ngoconnect.com', password: 'Ngo@123456', role: 'NGO', name: 'Demo NGO User' },
    { email: 'donor@ngoconnect.com', password: 'Donor@12345', role: 'DONOR', name: 'Demo Donor' },
    { email: 'akshansh676@gmail.com', password: 'Akshansh@123', role: 'REPORTER', name: 'Akshansh' },
  ];
  for (const acc of accounts) {
    const passwordHash = await bcrypt.hash(acc.password, 12);
    const existing = await p.user.findUnique({ where: { email: acc.email } });
    if (existing) {
      await p.user.update({ where: { email: acc.email }, data: { passwordHash, name: acc.name } });
      console.log('Updated: ' + acc.email);
    } else {
      await p.user.create({ data: { email: acc.email, passwordHash, role: acc.role, name: acc.name } });
      console.log('Created: ' + acc.email);
    }
  }
  await p.$disconnect();
  console.log('Done!');
}
seed().catch(e => console.error(e.message));
