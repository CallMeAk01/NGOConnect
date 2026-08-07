// ============================================================
// NGO CONNECT — Mock Data
// ============================================================

const MOCK_DATA = {
  // --- Platform Stats ---
  stats: {
    totalRescues: 14520,
    successRate: 94.2,
    totalFundsRaised: 5680000,
    totalFundsSpent: 5290000,
    medicinesRedistributed: 3920,
    activeVolunteers: 2150,
    citiesCovered: 34,
    ngosRegistered: 186,
  },

  // --- Cases ---
  cases: [
    {
      id: 'CASE-1001',
      title: 'Injured Dog Found Near Railway Track',
      animal: 'Dog',
      emoji: '🐕',
      location: 'Andheri East, Mumbai',
      city: 'Mumbai',
      urgency: 'critical',
      status: 'in-progress',
      description: 'A stray dog with a severely injured hind leg was found near the railway tracks. The dog is unable to walk and appears to be in extreme pain. Immediate medical attention required.',
      reportedBy: 'Rahul Sharma',
      reportedAt: '2026-02-18T10:30:00+05:30',
      ngoAssigned: 'ngo-1',
      fundsRequired: 15000,
      fundsRaised: 11200,
      photos: ['🐕‍🦺'],
      timeline: [
        { date: '2026-02-18T10:30:00+05:30', title: 'Case Reported', desc: 'Reported by Rahul Sharma via mobile app', actor: 'Rahul Sharma' },
        { date: '2026-02-18T10:45:00+05:30', title: 'NGO Assigned', desc: 'Paws & Care Foundation accepted the case', actor: 'System' },
        { date: '2026-02-18T11:15:00+05:30', title: 'Rescue Team Dispatched', desc: 'Volunteer team of 3 dispatched to location', actor: 'Paws & Care Foundation' },
        { date: '2026-02-18T12:00:00+05:30', title: 'Animal Rescued', desc: 'Dog safely rescued and transported to clinic', actor: 'Volunteer Team' },
        { date: '2026-02-18T13:30:00+05:30', title: 'Treatment Started', desc: 'X-ray done. Fracture detected in right hind leg. Surgery scheduled.', actor: 'Dr. Priya Kapoor' },
      ],
      financials: [
        { date: '2026-02-18T11:00:00+05:30', desc: 'Donation by Ankit Verma', amount: 5000, type: 'credit' },
        { date: '2026-02-18T12:30:00+05:30', desc: 'Donation by Meera Patel', amount: 3000, type: 'credit' },
        { date: '2026-02-18T14:00:00+05:30', desc: 'Donation by Anonymous', amount: 3200, type: 'credit' },
        { date: '2026-02-18T13:00:00+05:30', desc: 'Transport to clinic', amount: 500, type: 'debit' },
        { date: '2026-02-18T14:00:00+05:30', desc: 'X-ray & initial treatment', amount: 2500, type: 'debit' },
      ],
    },
    {
      id: 'CASE-1002',
      title: 'Kitten Stuck in Storm Drain',
      animal: 'Cat',
      emoji: '🐱',
      location: 'Koramangala, Bangalore',
      city: 'Bangalore',
      urgency: 'critical',
      status: 'resolved',
      description: 'A small kitten has fallen into a storm drain and is crying for help. The drain is deep and the kitten cannot climb out. Needs immediate rescue.',
      reportedBy: 'Sneha Reddy',
      reportedAt: '2026-02-17T16:20:00+05:30',
      ngoAssigned: 'ngo-2',
      fundsRequired: 5000,
      fundsRaised: 5000,
      photos: ['🐈'],
      timeline: [
        { date: '2026-02-17T16:20:00+05:30', title: 'Case Reported', desc: 'Reported by Sneha Reddy', actor: 'Sneha Reddy' },
        { date: '2026-02-17T16:35:00+05:30', title: 'NGO Assigned', desc: 'Bangalore Animal Rescue accepted', actor: 'System' },
        { date: '2026-02-17T17:00:00+05:30', title: 'Rescue Completed', desc: 'Kitten safely extracted from the drain', actor: 'Rescue Team' },
        { date: '2026-02-17T18:00:00+05:30', title: 'Medical Check', desc: 'Minor dehydration, otherwise healthy', actor: 'Dr. Arjun N.' },
        { date: '2026-02-17T20:00:00+05:30', title: 'Case Resolved', desc: 'Kitten placed in foster care. Adoption pending.', actor: 'Bangalore Animal Rescue' },
      ],
      financials: [
        { date: '2026-02-17T17:00:00+05:30', desc: 'Donation by Priya Das', amount: 2000, type: 'credit' },
        { date: '2026-02-17T18:30:00+05:30', desc: 'Donation by Vikram S.', amount: 3000, type: 'credit' },
        { date: '2026-02-17T17:30:00+05:30', desc: 'Rescue equipment', amount: 800, type: 'debit' },
        { date: '2026-02-17T18:30:00+05:30', desc: 'Medical check-up', amount: 1200, type: 'debit' },
      ],
    },
    {
      id: 'CASE-1003',
      title: 'Cow with Plastic Ingestion',
      animal: 'Cow',
      emoji: '🐄',
      location: 'Vaishali Nagar, Jaipur',
      city: 'Jaipur',
      urgency: 'critical',
      status: 'in-progress',
      description: 'A cow has been observed eating large amounts of plastic waste near the market area. It appears bloated and distressed. Veterinary intervention needed urgently.',
      reportedBy: 'Deepak Joshi',
      reportedAt: '2026-02-18T08:15:00+05:30',
      ngoAssigned: 'ngo-3',
      fundsRequired: 25000,
      fundsRaised: 18500,
      photos: ['🐄'],
      timeline: [
        { date: '2026-02-18T08:15:00+05:30', title: 'Case Reported', desc: 'Reported by Deepak Joshi', actor: 'Deepak Joshi' },
        { date: '2026-02-18T08:30:00+05:30', title: 'NGO Assigned', desc: 'Jaipur Gaushala Trust took the case', actor: 'System' },
        { date: '2026-02-18T09:45:00+05:30', title: 'Vet Dispatched', desc: 'Dr. Ramesh on the way', actor: 'Jaipur Gaushala Trust' },
        { date: '2026-02-18T11:00:00+05:30', title: 'Treatment in Progress', desc: 'Laxatives administered. Monitoring started.', actor: 'Dr. Ramesh' },
      ],
      financials: [
        { date: '2026-02-18T09:00:00+05:30', desc: 'Donation by Kavita Mehra', amount: 10000, type: 'credit' },
        { date: '2026-02-18T10:30:00+05:30', desc: 'Donation by Suresh Kumar', amount: 5000, type: 'credit' },
        { date: '2026-02-18T12:00:00+05:30', desc: 'Donation by Anonymous', amount: 3500, type: 'credit' },
        { date: '2026-02-18T10:00:00+05:30', desc: 'Vet visit charges', amount: 3000, type: 'debit' },
        { date: '2026-02-18T11:30:00+05:30', desc: 'Medicines', amount: 2000, type: 'debit' },
      ],
    },
    {
      id: 'CASE-1004',
      title: 'Parrot with Broken Wing',
      animal: 'Bird',
      emoji: '🦜',
      location: 'Salt Lake, Kolkata',
      city: 'Kolkata',
      urgency: 'moderate',
      status: 'in-progress',
      description: 'A green parrot found on the ground unable to fly. The right wing appears to be broken. The bird is alert but cannot move properly.',
      reportedBy: 'Ananya Sen',
      reportedAt: '2026-02-18T14:00:00+05:30',
      ngoAssigned: 'ngo-4',
      fundsRequired: 8000,
      fundsRaised: 4500,
      photos: ['🦜'],
      timeline: [
        { date: '2026-02-18T14:00:00+05:30', title: 'Case Reported', desc: 'Reported by Ananya Sen', actor: 'Ananya Sen' },
        { date: '2026-02-18T14:20:00+05:30', title: 'NGO Assigned', desc: 'Wings of Hope assigned to the case', actor: 'System' },
        { date: '2026-02-18T15:30:00+05:30', title: 'Pickup Completed', desc: 'Bird safely collected and taken to avian center', actor: 'Volunteer' },
      ],
      financials: [
        { date: '2026-02-18T15:00:00+05:30', desc: 'Donation by Rohan Ghosh', amount: 2500, type: 'credit' },
        { date: '2026-02-18T16:00:00+05:30', desc: 'Donation by Neha Bose', amount: 2000, type: 'credit' },
        { date: '2026-02-18T15:45:00+05:30', desc: 'Transport', amount: 300, type: 'debit' },
      ],
    },
    {
      id: 'CASE-1005',
      title: 'Abandoned Puppies in Cardboard Box',
      animal: 'Dog',
      emoji: '🐶',
      location: 'Banjara Hills, Hyderabad',
      city: 'Hyderabad',
      urgency: 'moderate',
      status: 'open',
      description: 'Four puppies found abandoned in a sealed cardboard box near a dumpster. They are approximately 2 weeks old and need immediate shelter and feeding.',
      reportedBy: 'Lakshmi Rao',
      reportedAt: '2026-02-18T16:45:00+05:30',
      ngoAssigned: null,
      fundsRequired: 12000,
      fundsRaised: 0,
      photos: ['🐶'],
      timeline: [
        { date: '2026-02-18T16:45:00+05:30', title: 'Case Reported', desc: 'Reported by Lakshmi Rao with photos', actor: 'Lakshmi Rao' },
      ],
      financials: [],
    },
    {
      id: 'CASE-1006',
      title: 'Horse with Hoof Infection',
      animal: 'Horse',
      emoji: '🐴',
      location: 'Chandni Chowk, Delhi',
      city: 'Delhi',
      urgency: 'moderate',
      status: 'resolved',
      description: 'A carriage horse with a visible hoof infection. The horse is limping and the owner does not have resources for treatment.',
      reportedBy: 'Amit Kumar',
      reportedAt: '2026-02-15T09:00:00+05:30',
      ngoAssigned: 'ngo-5',
      fundsRequired: 10000,
      fundsRaised: 10000,
      photos: ['🐴'],
      timeline: [
        { date: '2026-02-15T09:00:00+05:30', title: 'Case Reported', desc: 'Reported by Amit Kumar', actor: 'Amit Kumar' },
        { date: '2026-02-15T09:30:00+05:30', title: 'NGO Assigned', desc: 'Delhi Animal Care accepted', actor: 'System' },
        { date: '2026-02-15T11:00:00+05:30', title: 'Treatment Started', desc: 'Hoof cleaned and treated', actor: 'Dr. Sanjay' },
        { date: '2026-02-17T10:00:00+05:30', title: 'Follow-up Visit', desc: 'Healing well. Antibiotics continuing.', actor: 'Dr. Sanjay' },
        { date: '2026-02-18T09:00:00+05:30', title: 'Case Resolved', desc: 'Hoof fully healed. Owner educated about care.', actor: 'Delhi Animal Care' },
      ],
      financials: [
        { date: '2026-02-15T10:00:00+05:30', desc: 'Donation by Community Fund', amount: 10000, type: 'credit' },
        { date: '2026-02-15T11:30:00+05:30', desc: 'Treatment & medicines', amount: 6500, type: 'debit' },
        { date: '2026-02-17T10:30:00+05:30', desc: 'Follow-up medicines', amount: 2000, type: 'debit' },
      ],
    },
    {
      id: 'CASE-1007',
      title: 'Monkey Trapped in Construction Net',
      animal: 'Monkey',
      emoji: '🐒',
      location: 'Sector 15, Noida',
      city: 'Noida',
      urgency: 'critical',
      status: 'open',
      description: 'A monkey is tangled in construction safety netting on the 3rd floor of an under-construction building. It is panicking and could injure itself further.',
      reportedBy: 'Neeta Singh',
      reportedAt: '2026-02-18T17:20:00+05:30',
      ngoAssigned: null,
      fundsRequired: 7000,
      fundsRaised: 0,
      photos: ['🐒'],
      timeline: [
        { date: '2026-02-18T17:20:00+05:30', title: 'Case Reported', desc: 'Reported by Neeta Singh — urgent extraction needed', actor: 'Neeta Singh' },
      ],
      financials: [],
    },
    {
      id: 'CASE-1008',
      title: 'Turtle Found on Busy Highway',
      animal: 'Turtle',
      emoji: '🐢',
      location: 'MG Road, Pune',
      city: 'Pune',
      urgency: 'stable',
      status: 'resolved',
      description: 'A large turtle was found attempting to cross a busy highway. Safely relocated to a nearby lake by the reporting volunteer.',
      reportedBy: 'Vishal Patil',
      reportedAt: '2026-02-16T07:30:00+05:30',
      ngoAssigned: 'ngo-6',
      fundsRequired: 1000,
      fundsRaised: 1000,
      photos: ['🐢'],
      timeline: [
        { date: '2026-02-16T07:30:00+05:30', title: 'Case Reported', desc: 'Reported by Vishal Patil', actor: 'Vishal Patil' },
        { date: '2026-02-16T07:45:00+05:30', title: 'Animal Relocated', desc: 'Turtle safely moved to Pashan Lake', actor: 'Vishal Patil' },
        { date: '2026-02-16T08:00:00+05:30', title: 'Case Resolved', desc: 'Verified by Pune Animal Welfare', actor: 'Pune Animal Welfare' },
      ],
      financials: [
        { date: '2026-02-16T08:00:00+05:30', desc: 'Donation by Vishal Patil', amount: 1000, type: 'credit' },
      ],
    },
    {
      id: 'CASE-1009',
      title: 'Elephant Calf Separated from Herd',
      animal: 'Elephant',
      emoji: '🐘',
      location: 'Wayanad District, Kerala',
      city: 'Kerala',
      urgency: 'critical',
      status: 'in-progress',
      description: 'A young elephant calf was found wandering alone near a village, separated from its herd. The calf appears dehydrated and distressed. Forest department and wildlife NGO coordination needed.',
      reportedBy: 'Thomas Kurian',
      reportedAt: '2026-02-22T06:00:00+05:30',
      ngoAssigned: 'ngo-7',
      fundsRequired: 50000,
      fundsRaised: 32000,
      photos: ['🐘'],
      timeline: [
        { date: '2026-02-22T06:00:00+05:30', title: 'Case Reported', desc: 'Reported by villager Thomas Kurian with GPS coordinates', actor: 'Thomas Kurian' },
        { date: '2026-02-22T06:20:00+05:30', title: 'NGO Assigned', desc: 'Wildlife SOS Kerala accepted the case', actor: 'System' },
        { date: '2026-02-22T07:30:00+05:30', title: 'Forest Dept Coordinated', desc: 'Forest ranger team dispatched alongside NGO', actor: 'Wildlife SOS Kerala' },
        { date: '2026-02-22T09:00:00+05:30', title: 'Calf Located & Secured', desc: 'Elephant calf found 2km from village. IV fluids administered.', actor: 'Dr. Anand Nair' },
        { date: '2026-02-22T14:00:00+05:30', title: 'Herd Tracking in Progress', desc: 'Drone deployed to locate mother herd. Signal detected 5km north.', actor: 'Wildlife SOS Kerala' },
      ],
      financials: [
        { date: '2026-02-22T07:00:00+05:30', desc: 'Donation by Corporate CSR Fund', amount: 20000, type: 'credit' },
        { date: '2026-02-22T10:00:00+05:30', desc: 'Donation by Wildlife Lovers Club', amount: 12000, type: 'credit' },
        { date: '2026-02-22T08:00:00+05:30', desc: 'Transport & medical supplies', amount: 8000, type: 'debit' },
        { date: '2026-02-22T10:00:00+05:30', desc: 'Drone rental for herd tracking', amount: 5000, type: 'debit' },
      ],
    },
    {
      id: 'CASE-1010',
      title: 'Injured Eagle Found on Rooftop',
      animal: 'Eagle',
      emoji: '🦅',
      location: 'Marine Drive, Chennai',
      city: 'Chennai',
      urgency: 'moderate',
      status: 'in-progress',
      description: 'A Brahminy Kite eagle found on a residential rooftop with a wounded left wing, possibly from collision with a glass building. Bird is alert but unable to fly.',
      reportedBy: 'Preethi Rajan',
      reportedAt: '2026-02-23T08:45:00+05:30',
      ngoAssigned: 'ngo-8',
      fundsRequired: 12000,
      fundsRaised: 7500,
      photos: ['🦅'],
      timeline: [
        { date: '2026-02-23T08:45:00+05:30', title: 'Case Reported', desc: 'Reported by Preethi Rajan with photos of the injured eagle', actor: 'Preethi Rajan' },
        { date: '2026-02-23T09:00:00+05:30', title: 'NGO Assigned', desc: 'Chennai Bird Rescue accepted the case', actor: 'System' },
        { date: '2026-02-23T09:40:00+05:30', title: 'Rescue Team Dispatched', desc: 'Specialized bird handler dispatched with capture equipment', actor: 'Chennai Bird Rescue' },
        { date: '2026-02-23T10:30:00+05:30', title: 'Bird Captured Safely', desc: 'Eagle carefully captured and transported to avian center', actor: 'Handler Rajiv M.' },
      ],
      financials: [
        { date: '2026-02-23T09:30:00+05:30', desc: 'Donation by Preethi Rajan', amount: 5000, type: 'credit' },
        { date: '2026-02-23T11:00:00+05:30', desc: 'Donation by Anonymous', amount: 2500, type: 'credit' },
        { date: '2026-02-23T10:45:00+05:30', desc: 'Capture equipment & transport', amount: 1500, type: 'debit' },
      ],
    },
    {
      id: 'CASE-1011',
      title: 'Pack of Stray Dogs Poisoned',
      animal: 'Dog',
      emoji: '🐕‍🦺',
      location: 'Gomti Nagar, Lucknow',
      city: 'Lucknow',
      urgency: 'critical',
      status: 'in-progress',
      description: 'Multiple stray dogs found convulsing near a garbage dump, suspected rat poison mixed in food waste. 6 dogs affected, 2 in critical condition. Immediate veterinary attention needed.',
      reportedBy: 'Arun Mishra',
      reportedAt: '2026-02-23T11:00:00+05:30',
      ngoAssigned: 'ngo-9',
      fundsRequired: 35000,
      fundsRaised: 15000,
      photos: ['🐕‍🦺'],
      timeline: [
        { date: '2026-02-23T11:00:00+05:30', title: 'Case Reported', desc: 'Emergency reported by Arun Mishra — multiple animals affected', actor: 'Arun Mishra' },
        { date: '2026-02-23T11:05:00+05:30', title: 'Critical Alert Sent', desc: 'System auto-dispatched critical alert to 3 nearby NGOs', actor: 'System' },
        { date: '2026-02-23T11:15:00+05:30', title: 'NGO Assigned', desc: 'Lucknow Animal Shelter accepted with full vet team', actor: 'System' },
        { date: '2026-02-23T11:45:00+05:30', title: 'Vet Team Arrived', desc: 'Emergency treatment started — activated charcoal + IV fluids for all 6 dogs', actor: 'Dr. Shalini Gupta' },
        { date: '2026-02-23T13:00:00+05:30', title: 'Status Update', desc: '4 dogs stabilized. 2 still critical but responding to treatment.', actor: 'Dr. Shalini Gupta' },
      ],
      financials: [
        { date: '2026-02-23T11:30:00+05:30', desc: 'Emergency Fund by Platform', amount: 10000, type: 'credit' },
        { date: '2026-02-23T12:00:00+05:30', desc: 'Donation by Arun Mishra', amount: 5000, type: 'credit' },
        { date: '2026-02-23T12:00:00+05:30', desc: 'Emergency medicines & IV fluids', amount: 8000, type: 'debit' },
        { date: '2026-02-23T12:30:00+05:30', desc: 'Vet team emergency charges', amount: 5000, type: 'debit' },
      ],
    },
    {
      id: 'CASE-1012',
      title: 'Dolphin Stranded on Riverbank',
      animal: 'Dolphin',
      emoji: '🐬',
      location: 'Guwahati Riverfront, Assam',
      city: 'Guwahati',
      urgency: 'critical',
      status: 'open',
      description: 'A Gangetic river dolphin found stranded on a sandbank near the Brahmaputra riverfront. The dolphin is alive but unable to return to deeper water. Wildlife experts needed immediately.',
      reportedBy: 'Nayan Bora',
      reportedAt: '2026-02-23T13:30:00+05:30',
      ngoAssigned: null,
      fundsRequired: 20000,
      fundsRaised: 0,
      photos: ['🐬'],
      timeline: [
        { date: '2026-02-23T13:30:00+05:30', title: 'Case Reported', desc: 'Urgent report by Nayan Bora — endangered Gangetic dolphin stranded', actor: 'Nayan Bora' },
      ],
      financials: [],
    },
  ],

  // --- NGOs ---
  ngos: [
    {
      id: 'ngo-1',
      name: 'Paws & Care Foundation',
      emoji: '🐾',
      city: 'Mumbai',
      verified: true,
      verifiedDate: '2024-06-15',
      memberSince: '2024-03-10',
      successRate: 96,
      totalRescues: 1842,
      avgResponseTime: '23 min',
      rating: 4.8,
      reviewCount: 342,
      specialization: ['Rescue', 'Medical', 'Shelter'],
      description: 'Paws & Care Foundation is Mumbai\'s leading animal rescue organization, dedicated to rescuing, rehabilitating, and rehoming stray and injured animals across the metropolitan region.',
      totalFundsReceived: 2850000,
      totalFundsSpent: 2720000,
      reviews: [
        { user: 'Aarav M.', rating: 5, date: '2026-02-10', comment: 'Incredible response time. They saved my neighborhood dog within an hour!' },
        { user: 'Priya S.', rating: 5, date: '2026-01-28', comment: 'Very transparent about fund usage. Great team!' },
        { user: 'Karan J.', rating: 4, date: '2026-01-15', comment: 'Good work overall but communication could improve.' },
      ],
    },
    {
      id: 'ngo-2',
      name: 'Bangalore Animal Rescue',
      emoji: '🦮',
      city: 'Bangalore',
      verified: true,
      verifiedDate: '2024-08-22',
      memberSince: '2024-05-01',
      successRate: 93,
      totalRescues: 1256,
      avgResponseTime: '31 min',
      rating: 4.7,
      reviewCount: 218,
      specialization: ['Rescue', 'Foster Care'],
      description: 'Bangalore Animal Rescue specializes in urban animal rescue and foster care programs, connecting rescued animals with loving foster families across the city.',
      totalFundsReceived: 1950000,
      totalFundsSpent: 1820000,
      reviews: [
        { user: 'Sneha R.', rating: 5, date: '2026-02-17', comment: 'Saved a kitten from a drain in under 40 minutes. Heroes!' },
        { user: 'Naveen K.', rating: 5, date: '2026-02-05', comment: 'Their foster program is amazing. Adopted my dog through them.' },
      ],
    },
    {
      id: 'ngo-3',
      name: 'Jaipur Gaushala Trust',
      emoji: '🐄',
      city: 'Jaipur',
      verified: true,
      verifiedDate: '2025-01-10',
      memberSince: '2024-11-15',
      successRate: 91,
      totalRescues: 856,
      avgResponseTime: '45 min',
      rating: 4.6,
      reviewCount: 156,
      specialization: ['Rescue', 'Medical', 'Shelter'],
      description: 'Dedicated to the care and protection of cows and other large animals in and around Jaipur. Runs a 50-bed shelter with full veterinary facilities.',
      totalFundsReceived: 3200000,
      totalFundsSpent: 3050000,
      reviews: [
        { user: 'Deepak J.', rating: 5, date: '2026-02-18', comment: 'Responded quickly to the cow emergency. Very professional.' },
        { user: 'Sunita D.', rating: 4, date: '2026-01-20', comment: 'Good shelter facility. Wish they had more volunteers.' },
      ],
    },
    {
      id: 'ngo-4',
      name: 'Wings of Hope',
      emoji: '🕊️',
      city: 'Kolkata',
      verified: true,
      verifiedDate: '2025-03-05',
      memberSince: '2025-01-20',
      successRate: 88,
      totalRescues: 623,
      avgResponseTime: '35 min',
      rating: 4.5,
      reviewCount: 98,
      specialization: ['Rescue', 'Avian Care'],
      description: 'Wings of Hope is Kolkata\'s only specialized avian rescue center, caring for injured birds and providing rehabilitation for release back into the wild.',
      totalFundsReceived: 890000,
      totalFundsSpent: 845000,
      reviews: [
        { user: 'Ananya S.', rating: 5, date: '2026-02-18', comment: 'The only bird rescue in Kolkata! So grateful they exist.' },
      ],
    },
    {
      id: 'ngo-5',
      name: 'Delhi Animal Care',
      emoji: '🏥',
      city: 'Delhi',
      verified: true,
      verifiedDate: '2024-04-18',
      memberSince: '2024-01-05',
      successRate: 95,
      totalRescues: 2134,
      avgResponseTime: '20 min',
      rating: 4.9,
      reviewCount: 456,
      specialization: ['Rescue', 'Medical', 'Shelter', 'Adoption'],
      description: 'Delhi Animal Care is the capital\'s most trusted animal welfare organization, running a 24/7 rescue helpline and a 200-capacity shelter with full veterinary hospital.',
      totalFundsReceived: 5400000,
      totalFundsSpent: 5150000,
      reviews: [
        { user: 'Amit K.', rating: 5, date: '2026-02-15', comment: 'Best animal NGO in Delhi. Fast, reliable, and transparent.' },
        { user: 'Ritika P.', rating: 5, date: '2026-02-01', comment: 'Adopted my cat from here. Amazing organization!' },
      ],
    },
    {
      id: 'ngo-6',
      name: 'Pune Animal Welfare',
      emoji: '💚',
      city: 'Pune',
      verified: true,
      verifiedDate: '2025-02-28',
      memberSince: '2024-12-01',
      successRate: 90,
      totalRescues: 478,
      avgResponseTime: '28 min',
      rating: 4.4,
      reviewCount: 87,
      specialization: ['Rescue', 'Medical'],
      description: 'Pune Animal Welfare focuses on street animal healthcare, running monthly vaccination drives and providing free sterilization across the city.',
      totalFundsReceived: 720000,
      totalFundsSpent: 685000,
      reviews: [
        { user: 'Vishal P.', rating: 4, date: '2026-02-16', comment: 'Verified my turtle relocation quickly. Keep up the good work!' },
      ],
    },
    {
      id: 'ngo-7',
      name: 'Wildlife SOS Kerala',
      emoji: '🌿',
      city: 'Kerala',
      verified: true,
      verifiedDate: '2024-09-12',
      memberSince: '2024-07-01',
      successRate: 94,
      totalRescues: 1120,
      avgResponseTime: '40 min',
      rating: 4.8,
      reviewCount: 275,
      specialization: ['Wildlife Rescue', 'Rehabilitation', 'Forest Coordination'],
      description: 'Wildlife SOS Kerala specializes in large wildlife rescue operations, working closely with the Forest Department to handle elephant, leopard, and endangered species emergencies across Kerala.',
      totalFundsReceived: 4200000,
      totalFundsSpent: 3980000,
      reviews: [
        { user: 'Thomas K.', rating: 5, date: '2026-02-22', comment: 'Incredible coordination with forest department for the elephant rescue!' },
        { user: 'Meena V.', rating: 5, date: '2026-02-10', comment: 'They handle the toughest wildlife cases with such professionalism.' },
      ],
    },
    {
      id: 'ngo-8',
      name: 'Chennai Bird Rescue',
      emoji: '🦜',
      city: 'Chennai',
      verified: true,
      verifiedDate: '2025-04-20',
      memberSince: '2025-02-15',
      successRate: 89,
      totalRescues: 340,
      avgResponseTime: '25 min',
      rating: 4.6,
      reviewCount: 64,
      specialization: ['Avian Care', 'Rescue', 'Rehabilitation'],
      description: 'Chennai Bird Rescue is Tamil Nadu\'s premier avian rescue center, specializing in raptor rehabilitation, injured bird treatment, and release programs along the Coromandel Coast.',
      totalFundsReceived: 650000,
      totalFundsSpent: 580000,
      reviews: [
        { user: 'Preethi R.', rating: 5, date: '2026-02-23', comment: 'They rescued an eagle from my rooftop within an hour. Absolute heroes!' },
        { user: 'Kumar S.', rating: 4, date: '2026-01-30', comment: 'Great work with bird rescue. Would love to see more outreach programs.' },
      ],
    },
    {
      id: 'ngo-9',
      name: 'Lucknow Animal Shelter',
      emoji: '🏠',
      city: 'Lucknow',
      verified: true,
      verifiedDate: '2024-11-30',
      memberSince: '2024-08-20',
      successRate: 92,
      totalRescues: 780,
      avgResponseTime: '18 min',
      rating: 4.7,
      reviewCount: 189,
      specialization: ['Emergency Response', 'Medical', 'Shelter', 'Sterilization'],
      description: 'Lucknow Animal Shelter runs the fastest emergency response network in UP, with a fleet of 5 rescue vans and 24/7 veterinary services. Known for handling mass casualty events.',
      totalFundsReceived: 1800000,
      totalFundsSpent: 1650000,
      reviews: [
        { user: 'Arun M.', rating: 5, date: '2026-02-23', comment: 'Their emergency response to the poisoning case was extraordinary. 6 dogs saved!' },
        { user: 'Ritu A.', rating: 5, date: '2026-02-15', comment: 'Best emergency vet response in UP. 18 minutes average!' },
        { user: 'Vivek T.', rating: 4, date: '2026-01-28', comment: 'Great shelter facility but gets overcrowded sometimes.' },
      ],
    },
  ],

  // --- Medicines ---
  medicines: {
    available: [
      { id: 'm1', name: 'Amoxicillin 250mg', type: 'Antibiotic', quantity: '30 tablets', expiry: '2026-08-15', location: 'Mumbai', donor: 'Dr. Priya K.', listedAt: '2026-02-17T10:00:00+05:30' },
      { id: 'm2', name: 'Cephalexin 500mg', type: 'Antibiotic', quantity: '20 capsules', expiry: '2026-11-30', location: 'Delhi', donor: 'Amit V.', listedAt: '2026-02-16T14:30:00+05:30' },
      { id: 'm3', name: 'Meloxicam 7.5mg', type: 'Anti-inflammatory', quantity: '15 tablets', expiry: '2027-01-20', location: 'Bangalore', donor: 'Pet Care Clinic', listedAt: '2026-02-18T09:00:00+05:30' },
      { id: 'm4', name: 'Ivermectin 3mg', type: 'Anti-parasitic', quantity: '10 tablets', expiry: '2026-09-25', location: 'Jaipur', donor: 'Dr. Ramesh S.', listedAt: '2026-02-15T16:45:00+05:30' },
      { id: 'm5', name: 'Dermazole Cream', type: 'Topical', quantity: '5 tubes', expiry: '2026-12-10', location: 'Pune', donor: 'Sneha R.', listedAt: '2026-02-18T11:20:00+05:30' },
      { id: 'm6', name: 'Ranitidine 150mg', type: 'Antacid', quantity: '40 tablets', expiry: '2026-07-01', location: 'Hyderabad', donor: 'Lakshmi P.', listedAt: '2026-02-14T08:00:00+05:30' },
    ],
    requests: [
      { id: 'r1', name: 'Metronidazole 400mg', type: 'Antibiotic', quantity: '20 tablets', urgency: 'critical', caseId: 'CASE-1003', location: 'Jaipur', requestedBy: 'Jaipur Gaushala Trust', requestedAt: '2026-02-18T12:00:00+05:30' },
      { id: 'r2', name: 'Wound Dressing Kit', type: 'Surgical', quantity: '5 kits', urgency: 'moderate', caseId: 'CASE-1001', location: 'Mumbai', requestedBy: 'Paws & Care Foundation', requestedAt: '2026-02-18T14:30:00+05:30' },
      { id: 'r3', name: 'Calcium Supplements', type: 'Supplement', quantity: '30 tablets', urgency: 'stable', caseId: null, location: 'Kolkata', requestedBy: 'Wings of Hope', requestedAt: '2026-02-17T09:00:00+05:30' },
    ],
  },

  // --- Testimonials ---
  testimonials: [
    {
      quote: "I found an injured dog on my way to work and had no idea what to do. NGO CONNECT made it so easy — I just uploaded a photo and location, and within 30 minutes, a rescue team was there!",
      name: 'Aisha Khan',
      role: 'Reporter',
      emoji: '👩',
    },
    {
      quote: "As an NGO, this platform has revolutionized how we receive and manage cases. The transparency features give our donors complete confidence in our work.",
      name: 'Dr. Rajesh Nair',
      role: 'NGO Director, Paws & Care',
      emoji: '👨‍⚕️',
    },
    {
      quote: "I donate monthly through NGO CONNECT because I can see exactly where every rupee goes. The financial tracking is unmatched. I've helped save 12 animals so far!",
      name: 'Kavita Mehra',
      role: 'Regular Donor',
      emoji: '👩‍💼',
    },
  ],

  // --- Team ---
  team: [
    { name: 'Akshansh Rathore', role: 'Project Lead', emoji: '👨‍💼' },
    { name: 'Manish Kumar', role: 'Technology Lead', emoji: '👨‍💻' },
    { name: 'Bhupendra Singh', role: 'Innovation and Testing Lead', emoji: '🔬' },
    { name: 'Sanskar Dubey', role: 'Marketing Lead', emoji: '📢' },
  ],
};

// --- Utility Functions ---
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDateTime(dateStr) {
  return `${formatDate(dateStr)} at ${formatTime(dateStr)}`;
}

function formatCurrency(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}

function getUrgencyBadge(urgency) {
  const map = {
    critical: '<span class="badge badge-critical">🔴 Critical</span>',
    moderate: '<span class="badge badge-moderate">🟡 Moderate</span>',
    stable: '<span class="badge badge-stable">🟢 Stable</span>',
  };
  return map[urgency] || '';
}

function getStatusBadge(status) {
  const map = {
    open: '<span class="badge badge-open">Open</span>',
    'in-progress': '<span class="badge badge-in-progress">In Progress</span>',
    resolved: '<span class="badge badge-resolved">✅ Resolved</span>',
  };
  return map[status] || '';
}

function getNgoById(id) {
  return MOCK_DATA.ngos.find(n => n.id === id);
}

function getCaseById(id) {
  return MOCK_DATA.cases.find(c => c.id === id);
}
