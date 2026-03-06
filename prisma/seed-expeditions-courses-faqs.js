const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedExpeditionsCoursesAndFAQs() {
  try {
    console.log("Seeding Expeditions, Courses, and FAQs...\n");

    // Seed Expeditions
    console.log("Creating Expeditions...");
    const expeditions = [
      {
        slug: "yunam-peak",
        name: "Yunam Peak",
        description: "A moderate trekking peak at 4,885m with stunning views of the Himalayas",
        state: "Himachal Pradesh",
        basePrice: 20000 * 100,
        difficulty: "HARD",
        duration: 5,
        maxAltitude: 4885,
        distance: 22,
        itinerary: "Day 1: Reach base camp\nDay 2: Acclimatization\nDay 3: Summit push\nDay 4: Descent and exploration\nDay 5: Return",
        imageUrl: "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg",
        thumbnailUrl: "https://res.cloudinary.com/thetrail/image/upload/c_thumb,w_200/v1714107209/default_trek_image.jpg"
      },
      {
        slug: "friendship-peak",
        name: "Friendship Peak",
        description: "A challenging alpine expedition at 5,289m near the Spiti valley",
        state: "Himachal Pradesh",
        basePrice: 28000 * 100,
        difficulty: "VERY_HARD",
        duration: 7,
        maxAltitude: 5289,
        distance: 35,
        itinerary: "Day 1-2: Travel and acclimatization\nDay 3-5: Climbing days\nDay 6: Summit\nDay 7: Descent and return",
        imageUrl: "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg",
        thumbnailUrl: "https://res.cloudinary.com/thetrail/image/upload/c_thumb,w_200/v1714107209/default_trek_image.jpg"
      }
    ];

    for (const expedition of expeditions) {
      await prisma.expedition.upsert({
        where: { slug: expedition.slug },
        update: expedition,
        create: expedition
      });
    }
    console.log("✓ Created 2 expeditions\n");

    // Seed Courses
    console.log("Creating Courses...");
    const courses = [
      {
        slug: "rock-climbing-basics",
        name: "Rock Climbing Basics",
        description: "Learn fundamental rock climbing techniques in a safe environment",
        location: "Dharamshala, HP",
        price: 8000 * 100,
        difficulty: "EASY",
        duration: 3,
        imageUrl: "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg",
        thumbnailUrl: "https://res.cloudinary.com/thetrail/image/upload/c_thumb,w_200/v1714107209/default_trek_image.jpg"
      }
    ];

    for (const course of courses) {
      await prisma.course.upsert({
        where: { slug: course.slug },
        update: course,
        create: course
      });
    }
    console.log("✓ Created 1 course\n");

    // Seed FAQs
    console.log("Creating FAQs...");
    const faqs = [
      {
        question: "What is the best time to trek?",
        answer: "The best trekking season in Himachal Pradesh is June to September for summer treks and October to November for autumn treks.",
        category: "Trekking",
        order: 1
      },
      {
        question: "Do I need prior trekking experience?",
        answer: "No, we have treks for all levels from beginners to advanced. Choose a trek that matches your fitness level.",
        category: "Safety",
        order: 2
      },
      {
        question: "What should I pack for a trek?",
        answer: "Pack appropriate clothing layers, sturdy hiking boots, backpack, water bottle, and weather-appropriate gear.",
        category: "Preparation",
        order: 3
      },
      {
        question: "Is altitude sickness a concern?",
        answer: "For moderate altitudes (up to 4,000m), altitude sickness is rare. We recommend proper acclimatization during high-altitude treks.",
        category: "Safety",
        order: 4
      },
      {
        question: "How fit do I need to be?",
        answer: "Fitness requirements vary by trek difficulty. Easy treks require basic fitness; moderate to hard treks require regular exercise preparation.",
        category: "Preparation",
        order: 5
      },
      {
        question: "What meals are provided?",
        answer: "We provide meals as per the trek itinerary. Special dietary requirements can be accommodated with prior notice.",
        category: "Facilities",
        order: 6
      },
      {
        question: "Can I trek solo?",
        answer: "Yes, you can trek solo, but we recommend joining group treks for safety and shared experience.",
        category: "General",
        order: 7
      },
      {
        question: "What is the maximum altitude we trek?",
        answer: "Our regular treks go up to 4,000-4,500m. Expeditions can reach up to 5,000m or higher.",
        category: "Trekking",
        order: 8
      },
      {
        question: "Are permits required?",
        answer: "Some high-altitude areas require permits. We handle all permit arrangements for our treks.",
        category: "Legal",
        order: 9
      },
      {
        question: "What happens in case of emergency?",
        answer: "We have experienced guides with first aid training and satellite communication in high-altitude areas.",
        category: "Safety",
        order: 10
      }
    ];

    for (const faq of faqs) {
      await prisma.fAQ.upsert({
        where: { order: faq.order },
        update: faq,
        create: faq
      });
    }
    console.log("✓ Created 10 FAQs\n");

    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedExpeditionsCoursesAndFAQs();
