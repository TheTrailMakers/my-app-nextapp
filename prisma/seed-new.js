const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed for Expeditions, Courses, and FAQs...');

  // ========== EXPEDITIONS ==========
  
  // Check if expeditions already exist
  const existingExpeditions = await prisma.expedition.count();
  if (existingExpeditions === 0) {
    // Yunam Peak Expedition
    const yunnamPeak = await prisma.expedition.create({
      data: {
        slug: 'yunam-peak-expedition',
        name: 'Yunam Peak Expedition',
        description: 'Conquer the majestic Yunam Peak, a challenging alpine expedition in the heart of the Himalayas with breathtaking views and moderate technical climbing.',
        longDescription: 'The Yunam Peak Expedition is a thrilling high-altitude adventure that takes you through pristine Alpine meadows, dense forests, and challenging terrain. Standing at 5,630 meters, Yunam Peak offers mountaineers an excellent training ground for higher peaks. The expedition includes acclimatization days, technical climbing training, and experienced guide support.',
        state: 'Himachal Pradesh',
        basePrice: 65000 * 100, // 65,000 INR in paise
        difficulty: 'VERY_HARD',
        duration: 14,
        maxAltitude: 5630,
        distance: 45.5,
        bestSeason: 'Jun-Sep',
        thumbnailUrl: 'https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg',
        imageUrl: 'https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg',
        tags: ['expedition', 'alpine', 'technical-climbing', 'himachal-pradesh'],
        itinerary: `Day 1: Arrival at Manali and acclimatization
Day 2-3: Trek to base camp
Day 4-5: Acclimatization hikes and climbing training
Day 6-7: Technical climbing preparation
Day 8-9: Summit attempt
Day 10-11: Descent and recovery
Day 12-14: Rest and departure preparation`,
        inclusions: [
          'Professional mountain guides (1:2 ratio)',
          'All meals during expedition',
          'Camping equipment and tents',
          'Technical climbing gear (ropes, harnesses, etc.)',
          'Oxygen supply at higher altitudes',
          'Insurance coverage',
          'Medical support',
          'Transportation from Manali to base camp'
        ],
        exclusions: [
          'Personal climbing equipment',
          'Travel to Manali',
          'Acclimatization failures requiring descent',
          'Personal medications',
          'Tips and gratuities'
        ],
        requirements: [
          'Previous trekking experience (at least 3 high altitude treks)',
          'Good physical fitness level',
          'Mountaineering training or certification',
          'No medical conditions affecting high altitude',
          'Age between 18-60 preferred'
        ]
      }
    });

    // Friendship Peak Expedition
    const friendshipPeak = await prisma.expedition.create({
      data: {
        slug: 'friendship-peak-expedition',
        name: 'Friendship Peak Expedition',
        description: 'Climb the iconic Friendship Peak (5,289m), one of the most popular alpine expeditions in India with spectacular mountain views and reasonable technical difficulty.',
        longDescription: 'The Friendship Peak Expedition is an ideal introduction to high-altitude mountaineering in the Indian Himalayas. Located in Himachal Pradesh near Manali, this peak offers stunning panoramic views of surrounding majesty and a good balance of adventure and accessibility. The expedition includes comprehensive acclimatization, rock and ice climbing training, and professional support throughout.',
        state: 'Himachal Pradesh',
        basePrice: 55000 * 100, // 55,000 INR in paise
        difficulty: 'HARD',
        duration: 12,
        maxAltitude: 5289,
        distance: 38.2,
        bestSeason: 'Jun-Sep',
        thumbnailUrl: 'https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg',
        imageUrl: 'https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg',
        tags: ['expedition', 'alpine', 'beginner-mountaineering', 'himachal-pradesh'],
        itinerary: `Day 1: Arrival at Manali
Day 2-3: Trek to Chandra Tal base camp
Day 4-5: Acclimatization and training
Day 6-7: Rock and ice climbing practice
Day 8-9: Summit push
Day 10-11: Descent
Day 12: Departure`,
        inclusions: [
          'Expert mountain guides',
          'All camping and climbing equipment',
          'Meals and high-altitude snacks',
          'Training in rock and ice climbing',
          'Insurance and emergency support',
          'Oxygen bottles for altitude safety'
        ],
        exclusions: [
          'Travel to/from Manali',
          'Personal gear',
          'Evacuation costs due to altitude sickness',
          'Tips and extra activities'
        ],
        requirements: [
          'At least 2+ high altitude treks completed',
          'Good cardiovascular fitness',
          'Basic climbing experience',
          'No severe altitude sickness history',
          'Min age 16, max age 65'
        ]
      }
    });

    console.log('✅ Expeditions created:', yunnamPeak.name, friendshipPeak.name);
  } else {
    console.log('✅ Expeditions already exist, skipping...');
  }

  // ========== COURSES ==========

  const existingCourses = await prisma.course.count();
  if (existingCourses === 0) {
    const pururliaClimbing = await prisma.course.create({
      data: {
        slug: 'purulia-rock-climbing-course',
        name: 'Purulia Rock Climbing Course',
        description: 'Master rock climbing fundamentals in 4 days at Purulia hills with certified instructors and hands-on training on natural rock formations.',
        longDescription: 'The Purulia Rock Climbing Course is designed for beginners to intermediate climbers looking to master essential rock climbing techniques. Located in the scenic Purulia district of West Bengal, this course utilizes natural rock formations for authentic climbing experience. You\'ll learn rope management, belaying, rappelling, safety protocols, and multi-pitch climbing strategies.',
        location: 'Purulia, West Bengal',
        price: 5000 * 100, // 5,000 INR in paise
        duration: 4,
        difficulty: 'MODERATE',
        thumbnailUrl: 'https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg',
        imageUrl: 'https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg',
        tags: ['course', 'rock-climbing', 'beginner-friendly', 'west-bengal'],
        curriculum: `Day 1: Introduction to Rock Climbing
- Safety protocols and equipment familiarization
- Basic climbing holds and techniques
- Practice on beginner rock walls (3-4 meters)

Day 2: Intermediate Techniques
- Rope management and belaying
- Top-rope climbing setup
- Climbing 5-7 meter routes

Day 3: Advanced Skills
- Rappelling (abseiling) techniques
- Multi-pitch climbing introduction
- Climbing up to 10 meters with different holds
- Outdoor rock formation climbing

Day 4: Certification & Advanced Practice
- Lead climbing basics
- Safety verification
- Mock climbing scenarios
- Certification exam`,
        inclusions: [
          'All climbing equipment (harness, rope, carabiners, etc.)',
          'Certified instructor throughout',
          'Packed lunch all 4 days',
          'Training materials and handbook',
          'Safety briefings',
          'Climbing course certificate'
        ],
        exclusions: [
          'Personal climbing shoes (can rent for ₹200)',
          'Accommodation',
          'Transportation',
          'Additional meals'
        ],
        requirements: [
          'Age 16 and above',
          'Reasonable fitness level',
          'No severe fear of heights',
          'No joint or back problems',
          'Ability to commit to all 4 days'
        ],
        instructor: 'Raj Kumar (IFCAI Certified)'
      }
    });

    console.log('✅ Course created:', pururliaClimbing.name);
  } else {
    console.log('✅ Course already exists, skipping...');
  }

  // ========== FAQs ==========

  const existingFaqs = await prisma.fAQ.count();
  if (existingFaqs === 0) {
    const faqs = await prisma.fAQ.createMany({
      data: [
        {
          question: 'What is the best time to visit for trekking?',
          answer: 'The best trekking season in the Indian Himalayas is typically March-May (spring) and September-October (autumn). During these months, weather is stable, visibility is clear, and temperatures are moderate. Avoid monsoon season (June-September in some regions) and winter (December-February) for most high-altitude treks.',
          category: 'Trekking',
          order: 1
        },
        {
          question: 'Do I need prior trekking experience?',
          answer: 'It depends on the trek difficulty. Easy treks are suitable for beginners with no experience. Moderate treks require basic fitness. Hard and expert treks need prior trekking experience and good physical conditioning. We recommend starting with easier treks to build fitness before attempting challenging peaks.',
          category: 'Trekking',
          order: 2
        },
        {
          question: 'What should I pack for a trek?',
          answer: 'Essential items include: sturdy hiking boots, moisture-wicking clothing, warm layers, a rain jacket, backpack (40-50L), water bottle, sun protection, first aid kit, headlamp, and trekking poles. Pack light but be prepared for weather changes. We provide a detailed packing list with your booking confirmation.',
          category: 'Trekking',
          order: 3
        },
        {
          question: 'How do I prevent altitude sickness?',
          answer: 'Key prevention tips: ascend slowly to allow acclimatization, stay well-hydrated, avoid alcohol and heavy meals, get adequate sleep at each altitude, and consider medication like Diamox after consulting your doctor. Our guided treks include proper acclimatization days to minimize risk.',
          category: 'Trekking',
          order: 4
        },
        {
          question: 'Are your guides trained and certified?',
          answer: 'Yes, all our guides are professionally trained, certified, and have extensive high-altitude experience. They hold certifications from recognized mountaineering organizations and undergo regular training updates. We maintain a 1:6 guide-to-trekker ratio for safety.',
          category: 'Trekking',
          order: 5
        },
        {
          question: 'What is included in the trek cost?',
          answer: 'Trek packages typically include: professional guides, accommodation, meals, permits, and equipment. Some packages include transportation from major towns. Personal items, travel to the base location, and tips are usually not included. Check the specific package details for inclusions and exclusions.',
          category: 'Trekking',
          order: 6
        },
        {
          question: 'Can I book a private group trek?',
          answer: 'Absolutely! We offer customized private group treks for organizations, families, and friends. Private treks allow flexible dates, modified itineraries, and group discounts. Contact us with your group size and preferences for a customized quote.',
          category: 'General',
          order: 7
        },
        {
          question: 'What is your cancellation policy?',
          answer: 'Cancellations made 30+ days before the trek date receive a full refund. Cancellations 15-30 days before incur a 25% cancellation fee. Cancellations within 15 days forfeit 50% of the amount. In case of extreme weather or emergencies, we offer date rescheduling without penalty.',
          category: 'General',
          order: 8
        },
        {
          question: 'How do I register for climbing courses?',
          answer: 'You can register through our website by selecting your preferred course and dates. Complete the registration form, pay the course fee, and you\'ll receive a confirmation with pre-course requirements and instructions. Early registration (2+ weeks) secures your spot and may offer discounts.',
          category: 'Courses',
          order: 9
        },
        {
          question: 'Do you provide courses for beginners in rock climbing?',
          answer: 'Yes! Our Purulia Rock Climbing Course is specifically designed for beginners. We teach fundamental techniques, safety practices, and build confidence on natural rock formations. No prior climbing experience is necessary, just a good fitness level and enthusiasm.',
          category: 'Courses',
          order: 10
        }
      ]
    });

    console.log('✅ FAQs created: 10 questions added');
  } else {
    console.log('✅ FAQs already exist, skipping...');
  }

  console.log('\n✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
