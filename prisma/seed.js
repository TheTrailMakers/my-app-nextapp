/**
 * Prisma Seed Script - Complete Trek Catalog
 * Populates database with all trekking adventures and departure dates
 * 
 * Run with: npm run db:seed
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed with complete trek catalog...\n");

  try {
    // Always clear existing data for clean seed
    console.log("Clearing existing data...");
    await prisma.auditLog.deleteMany({});
    await prisma.trekReview.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.departure.deleteMany({});
    await prisma.trek.deleteMany({});

    console.log("Creating treks...\n");

    // Trek definitions with pricing
    const trekDefinitions = [
      {
        slug: "hampta-pass-trek",
        name: "Hampta Pass Trek",
        description: "A stunning trek through alpine meadows to the Hampta Pass at 4,270m",
        longDescription: "The Hampta Pass Trek is one of the most scenic treks in Himachal, offering breathtaking views of the Dhauladhar and Pir Panjal ranges. Perfect for experienced trekkers.",
        state: "Himachal Pradesh",
        basePrice: 16000 * 100,
        difficulty: "HARD",
        duration: 6,
        distance: 25,
        maxAltitude: 4270,
        bestSeason: "Jun-Sep",
        tags: ["alpine", "challenging", "6-days", "views"],
        itinerary: "Day 1: Reach Jobri\nDay 2: Trek to Shoja\nDay 3: Chika\nDay 4: Hampta Pass\nDay 5: Tani Jubari\nDay 6: Return",
        inclusions: ["Meals", "Guide", "Permits", "Equipment"],
        exclusions: ["Flights", "Personal gear", "Tips"],
        requirements: ["High fitness", "Altitude experience", "Climbing skills"],
      },
      {
        slug: "miyar-valley-trek",
        name: "Miyar Valley Trek",
        description: "Remote and pristine trek through glacial valleys and river gorges",
        longDescription: "Miyar Valley is one of the most remote treks in the Indian Himalayas, known for its untouched beauty and challenging terrain.",
        state: "Himachal Pradesh",
        basePrice: 18000 * 100,
        difficulty: "VERY_HARD",
        duration: 8,
        distance: 35,
        maxAltitude: 4250,
        bestSeason: "Jun-Sep",
        tags: ["remote", "glacier", "extreme", "8-days"],
        itinerary: "Day 1-8: Miyar Valley expedition",
        inclusions: ["All meals", "Expert guide", "Equipment", "Porter"],
        exclusions: ["Climbing gear", "Travel to base"],
        requirements: ["Expert level", "Previous Himalayan experience"],
      },
      {
        slug: "annapurna-base-camp-trek",
        name: "Annapurna Base Camp Trek",
        description: "Classic trek to the base camp of Annapurna (8,091m) - one of the world's highest peaks",
        longDescription: "The Annapurna Base Camp Trek is one of the most popular long-distance treks in the Himalayas, offering stunning views and diverse ecosystems.",
        state: "Nepal",
        basePrice: 25000 * 100,
        difficulty: "HARD",
        duration: 10,
        distance: 60,
        maxAltitude: 4130,
        bestSeason: "Sep-Nov, Mar-May",
        tags: ["iconic", "nepal", "10-days", "altitude"],
        itinerary: "Day 1-10: Annapurna circuit",
        inclusions: ["Accommodation", "Meals", "Guides", "Permits"],
        exclusions: ["Flights", "Travel to Nepal"],
        requirements: ["Good fitness", "Altitude experience"],
      },
      {
        slug: "sandakphu-trek",
        name: "Sandakphu Trek",
        description: "Trek to the highest peak of West Bengal with views of Kanchenjunga and Everest",
        longDescription: "Why I would do Sandakphu Trek at least once - one of the few places where you can see both Everest and Kanchenjunga.",
        state: "West Bengal",
        basePrice: 14000 * 100,
        difficulty: "MODERATE",
        duration: 7,
        distance: 32,
        maxAltitude: 3636,
        bestSeason: "Mar-May, Oct-Nov",
        tags: ["everest-view", "7-days", "moderate"],
        itinerary: "Day 1-7: Sandakphu ridge trek",
        inclusions: ["Homestays", "Meals", "Guide"],
        exclusions: ["Travel costs"],
        requirements: ["Basic fitness"],
      },
      {
        slug: "bajredara-trek",
        name: "Bajredara Trek",
        description: "Offbeat trek through alpine meadows and rhododendron forests",
        longDescription: "A lesser-known gem offering solitude and pristine mountain views.",
        state: "Himachal Pradesh",
        basePrice: 12000 * 100,
        difficulty: "EASY_MODERATE",
        duration: 5,
        distance: 18,
        maxAltitude: 3500,
        bestSeason: "Apr-Oct",
        tags: ["offbeat", "meadows", "moderate"],
        itinerary: "Day 1-5: Bajredara ridge",
        inclusions: ["Accommodation", "Meals", "Guide"],
        exclusions: ["Travel"],
        requirements: ["Moderate fitness"],
      },
      {
        slug: "kuari-pass-trek",
        name: "Kuari Pass Trek",
        description: "Beautiful trek in Uttarakhand with panoramic views of the Himalayas",
        longDescription: "Also known as Curzon Trail, offering stunning views of Nanda Devi, Trishul, and other major peaks.",
        state: "Uttarakhand",
        basePrice: 13000 * 100,
        difficulty: "MODERATE",
        duration: 5,
        distance: 22,
        maxAltitude: 3680,
        bestSeason: "Mar-Jun, Sep-Nov",
        tags: ["views", "moderate", "5-days"],
        itinerary: "Day 1-5: Kuari Pass circuit",
        inclusions: ["Meals", "Guide", "Camping"],
        exclusions: ["Transport"],
        requirements: ["Moderate fitness"],
      },
      {
        slug: "hilley-versey-trek",
        name: "Hilley – Versey Trek",
        description: "Short trek through oak and rhododendron forests",
        longDescription: "A serene trek perfect for spring when rhododendrons are in full bloom.",
        state: "Himachal Pradesh",
        basePrice: 8000 * 100,
        difficulty: "EASY",
        duration: 3,
        distance: 10,
        maxAltitude: 2700,
        bestSeason: "Mar-May",
        tags: ["easy", "flowers", "3-days"],
        itinerary: "Day 1-3: Forest walk",
        inclusions: ["Accommodation", "Meals"],
        exclusions: ["Transport"],
        requirements: ["Basic fitness"],
      },
      {
        slug: "tungnath-deoriatal-trek",
        name: "Tungnath – Deoriatal Trek",
        description: "Trek to the highest Shiva temple in the world with pristine alpine lake",
        longDescription: "Visit Tungnath, the highest temple dedicated to Lord Shiva, then descend to the beautiful Deoriatal lake.",
        state: "Uttarakhand",
        basePrice: 10000 * 100,
        difficulty: "EASY_MODERATE",
        duration: 4,
        distance: 15,
        maxAltitude: 3680,
        bestSeason: "Apr-Jun, Sep-Oct",
        tags: ["spiritual", "lake", "4-days"],
        itinerary: "Day 1-4: Temple and lake trek",
        inclusions: ["Accommodation", "Meals", "Guide"],
        exclusions: ["Transport"],
        requirements: ["Basic fitness"],
      },
      {
        slug: "beas-kund-trek",
        name: "Beas Kund Trek",
        description: "A moderate trek to the source of River Beas in the Himalayas",
        longDescription: "Beas Kund Trek takes you to the pristine alpine lake at 3,960 meters elevation. The trek offers stunning views of snow-capped peaks, dense forests, and Alpine meadows.",
        state: "Himachal Pradesh",
        basePrice: 15000 * 100,
        difficulty: "MODERATE",
        duration: 5,
        distance: 18,
        maxAltitude: 3960,
        bestSeason: "Jun-Sep",
        tags: ["alpine", "lake", "moderate", "5-days"],
        itinerary: "Day 1: Auli\nDay 2: Tali Top\nDay 3: Beas Kund\nDay 4: Explore\nDay 5: Return",
        inclusions: ["Accommodation", "Meals", "Guide", "Permits"],
        exclusions: ["Flights", "Travel insurance"],
        requirements: ["Basic fitness", "Comfortable shoes"],
      },
      {
        slug: "ranisui-lake-trek",
        name: "Ranisui Lake Trek",
        description: "An easy to moderate trek to a beautiful high-altitude lake in Himachal Pradesh",
        longDescription: "Ranisui Lake Trek is known for its stunning turquoise waters surrounded by dense forests and snow-capped peaks. Perfect for nature lovers and photography enthusiasts.",
        state: "Himachal Pradesh",
        basePrice: 12000 * 100,
        difficulty: "EASY_MODERATE",
        duration: 4,
        distance: 14,
        maxAltitude: 3600,
        bestSeason: "May-Oct",
        tags: ["lake", "easy-moderate", "4-days", "photography"],
        itinerary: "Day 1: Manali\nDay 2: Solang\nDay 3: Ranisui Lake\nDay 4: Return",
        inclusions: ["All meals", "Guide", "Transport", "Equipment"],
        exclusions: ["Personal gear", "Tips"],
        requirements: ["Moderate fitness", "Proper boots"],
      },
      {
        slug: "bhrigu-lake-trek",
        name: "Bhrigu Lake Trek",
        description: "A challenging trek to the sacred Bhrigu Lake at 4,300m altitude",
        longDescription: "Bhrigu Lake Trek is considered one of the most challenging and rewarding treks in Himachal. The trek passes through dense forests and meadows leading to the pristine lake.",
        state: "Himachal Pradesh",
        basePrice: 18000 * 100,
        difficulty: "HARD",
        duration: 7,
        distance: 27,
        maxAltitude: 4300,
        bestSeason: "Jul-Sep",
        tags: ["hard", "7-days", "altitude", "sacred"],
        itinerary: "Day 1: Kullu\nDay 2: Banjar\nDay 3: Rishi\nDay 4: Seri Top\nDay 5: Bhrigu\nDay 6: Rest\nDay 7: Return",
        inclusions: ["All meals", "Guide", "Equipment", "Porter"],
        exclusions: ["Personal gear", "Tips"],
        requirements: ["High fitness", "Altitude experience"],
      },
      {
        slug: "barafsar-lake-trek",
        name: "Barafsar Lake Trek",
        description: "Trek to a pristine glacier-fed lake in the heart of the Himalayas",
        longDescription: "Barafsar Lake offers untouched natural beauty with alpine views and crystal-clear waters.",
        state: "Himachal Pradesh",
        basePrice: 15000 * 100,
        difficulty: "HARD",
        duration: 6,
        distance: 24,
        maxAltitude: 4000,
        bestSeason: "Jul-Sep",
        tags: ["glacier", "lake", "6-days"],
        itinerary: "Day 1-6: Barafsar expedition",
        inclusions: ["All meals", "Guide", "Equipment"],
        exclusions: ["Transport"],
        requirements: ["Good fitness"],
      },
      {
        slug: "kashmir-great-lakes-trek",
        name: "Kashmir Great Lakes Trek",
        description: "Journey through 5 pristine alpine lakes in the Kashmir Himalayas",
        longDescription: "The Kashmir Great Lakes Trek is a spectacular 8-day trek passing through Vishansar, Krishnasar, Gadsar, Satsar, and Tatsarsar lakes.",
        state: "Jammu & Kashmir",
        basePrice: 20000 * 100,
        difficulty: "HARD",
        duration: 8,
        distance: 42,
        maxAltitude: 4270,
        bestSeason: "Jul-Sep",
        tags: ["lakes", "8-days", "alpine"],
        itinerary: "Day 1-8: Kashmir lakes circuit",
        inclusions: ["All meals", "Guide", "Equipment", "Permits"],
        exclusions: ["Travel to Kashmir"],
        requirements: ["Good fitness", "Altitude experience"],
      },
    ];

    // Create all treks
    const treks = {};
    for (const trekData of trekDefinitions) {
      const trek = await prisma.trek.create({ data: trekData });
      treks[trek.slug] = trek;
      console.log(`✓ Created: ${trek.name}`);
    }

    console.log("\nCreating departures...\n");

    // Departure dates organized by trek
    const departureData = [
      // HAMPTA PASS
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-06-15"), endDate: new Date("2026-06-20"), totalSeats: 10, pricePerPerson: 16000 * 100 },
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-06-22"), endDate: new Date("2026-06-27"), totalSeats: 12, pricePerPerson: 16000 * 100 },
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-07-13"), endDate: new Date("2026-07-18"), totalSeats: 15, pricePerPerson: 16000 * 100 },
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-07-20"), endDate: new Date("2026-07-25"), totalSeats: 15, pricePerPerson: 16000 * 100 },
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-07-27"), endDate: new Date("2026-08-01"), totalSeats: 15, pricePerPerson: 16000 * 100 },
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-08-04"), endDate: new Date("2026-08-09"), totalSeats: 15, pricePerPerson: 16500 * 100 },
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-08-25"), endDate: new Date("2026-08-31"), totalSeats: 15, pricePerPerson: 16500 * 100 },
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-09-01"), endDate: new Date("2026-09-06"), totalSeats: 15, pricePerPerson: 16500 * 100 },
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-09-15"), endDate: new Date("2026-09-20"), totalSeats: 15, pricePerPerson: 16000 * 100 },
      { trekSlug: "hampta-pass-trek", startDate: new Date("2026-09-25"), endDate: new Date("2026-09-30"), totalSeats: 15, pricePerPerson: 16000 * 100 },
      // MIYAR VALLEY
      { trekSlug: "miyar-valley-trek", startDate: new Date("2026-06-28"), endDate: new Date("2026-07-05"), totalSeats: 15, pricePerPerson: 18000 * 100 },
      { trekSlug: "miyar-valley-trek", startDate: new Date("2026-08-16"), endDate: new Date("2026-08-23"), totalSeats: 15, pricePerPerson: 18500 * 100 },
      { trekSlug: "miyar-valley-trek", startDate: new Date("2026-09-10"), endDate: new Date("2026-09-17"), totalSeats: 15, pricePerPerson: 18000 * 100 },
      // ANNAPURNA BASE CAMP
      { trekSlug: "annapurna-base-camp-trek", startDate: new Date("2026-04-10"), endDate: new Date("2026-04-19"), totalSeats: 10, pricePerPerson: 25000 * 100 },
      { trekSlug: "annapurna-base-camp-trek", startDate: new Date("2026-05-11"), endDate: new Date("2026-05-20"), totalSeats: 15, pricePerPerson: 25000 * 100 },
      { trekSlug: "annapurna-base-camp-trek", startDate: new Date("2026-09-10"), endDate: new Date("2026-09-19"), totalSeats: 15, pricePerPerson: 26000 * 100 },
      // SANDAKPHU
      { trekSlug: "sandakphu-trek", startDate: new Date("2026-03-01"), endDate: new Date("2026-03-06"), totalSeats: 4, pricePerPerson: 14000 * 100 },
      { trekSlug: "sandakphu-trek", startDate: new Date("2026-04-27"), endDate: new Date("2026-05-02"), totalSeats: 6, pricePerPerson: 14000 * 100 },
      { trekSlug: "sandakphu-trek", startDate: new Date("2026-10-11"), endDate: new Date("2026-10-16"), totalSeats: 15, pricePerPerson: 14500 * 100 },
      { trekSlug: "sandakphu-trek", startDate: new Date("2026-12-22"), endDate: new Date("2026-12-27"), totalSeats: 15, pricePerPerson: 15000 * 100 },
      // BAJREDARA
      { trekSlug: "bajredara-trek", startDate: new Date("2026-10-17"), endDate: new Date("2026-10-22"), totalSeats: 15, pricePerPerson: 12000 * 100 },
      // KUARI PASS
      { trekSlug: "kuari-pass-trek", startDate: new Date("2026-02-22"), endDate: new Date("2026-02-26"), totalSeats: 3, pricePerPerson: 13000 * 100 },
      { trekSlug: "kuari-pass-trek", startDate: new Date("2026-12-10"), endDate: new Date("2026-12-15"), totalSeats: 15, pricePerPerson: 13500 * 100 },
      // HILLEY-VERSEY
      { trekSlug: "hilley-versey-trek", startDate: new Date("2026-04-14"), endDate: new Date("2026-04-17"), totalSeats: 8, pricePerPerson: 8000 * 100 },
      // TUNGNATH-DEORIATAL
      { trekSlug: "tungnath-deoriatal-trek", startDate: new Date("2026-04-18"), endDate: new Date("2026-04-22"), totalSeats: 10, pricePerPerson: 10000 * 100 },
      // BEAS KUND
      { trekSlug: "beas-kund-trek", startDate: new Date("2026-05-08"), endDate: new Date("2026-05-11"), totalSeats: 12, pricePerPerson: 15000 * 100 },
      { trekSlug: "beas-kund-trek", startDate: new Date("2026-06-27"), endDate: new Date("2026-06-30"), totalSeats: 15, pricePerPerson: 15000 * 100 },
      // RANISUI LAKE
      { trekSlug: "ranisui-lake-trek", startDate: new Date("2026-05-11"), endDate: new Date("2026-05-14"), totalSeats: 15, pricePerPerson: 12000 * 100 },
      // BHRIGU LAKE
      { trekSlug: "bhrigu-lake-trek", startDate: new Date("2026-05-25"), endDate: new Date("2026-05-28"), totalSeats: 15, pricePerPerson: 18000 * 100 },
      { trekSlug: "bhrigu-lake-trek", startDate: new Date("2026-07-20"), endDate: new Date("2026-07-24"), totalSeats: 15, pricePerPerson: 18500 * 100 },
      // BARAFSAR LAKE
      { trekSlug: "barafsar-lake-trek", startDate: new Date("2026-08-15"), endDate: new Date("2026-08-20"), totalSeats: 15, pricePerPerson: 15000 * 100 },
      // KASHMIR GREAT LAKES
      { trekSlug: "kashmir-great-lakes-trek", startDate: new Date("2026-08-15"), endDate: new Date("2026-08-22"), totalSeats: 15, pricePerPerson: 20000 * 100 },
    ];

    // Create all departures
    let departureCount = 0;
    for (const depData of departureData) {
      const trek = treks[depData.trekSlug];
      await prisma.departure.create({
        data: {
          trekId: trek.id,
          startDate: depData.startDate,
          endDate: depData.endDate,
          totalSeats: depData.totalSeats,
          seatsAvailable: depData.totalSeats,
          pricePerPerson: depData.pricePerPerson,
        },
      });
      departureCount++;
    }

    console.log(`✓ Created ${departureCount} departures\n`);

    console.log("═══════════════════════════════════════════════════════════");
    console.log("✅ DATABASE SEEDED SUCCESSFULLY!");
    console.log("═══════════════════════════════════════════════════════════\n");

    console.log("📊 SUMMARY:");
    console.log(`   • Treks Created: ${Object.keys(treks).length}`);
    console.log(`   • Departures Created: ${departureCount}`);
    console.log(`   • Total Seats: ${departureData.reduce((sum, d) => sum + d.totalSeats, 0)}`);
    console.log(`   • All Seats Bookable: ✓\n`);

    console.log("🚀 NEXT STEPS:");
    console.log("   1. Visit http://localhost:3000/all to see all treks");
    console.log("   2. Test API: http://localhost:3000/api/treks");
    console.log("   3. View database: npx prisma studio");
    console.log("   4. Add Razorpay keys to .env.local");
    console.log("   5. Enable payments and bookings\n");

  } catch (e) {
    console.error("❌ Seed failed:", e);
    throw e;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
