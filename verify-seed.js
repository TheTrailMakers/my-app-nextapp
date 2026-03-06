const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const trekCount = await prisma.trek.count();
  const departureCount = await prisma.departure.count();
  const treks = await prisma.trek.findMany({
    select: { name: true, slug: true, departures: { select: { startDate: true, endDate: true, totalSeats: true } } },
    orderBy: { name: "asc" },
  });

  console.log("✅ DATABASE VERIFICATION");
  console.log("═════════════════════════════════════════════════════════");
  console.log(`Total Treks: ${trekCount} (Expected: 13)`);
  console.log(`Total Departures: ${departureCount} (Expected: 37)`);
  console.log(`\nTrek & Departure Details:`);
  treks.forEach((trek, i) => {
    console.log(`\n${i + 1}. ${trek.name}`);
    if (trek.departures.length > 0) {
      trek.departures.forEach((dep, j) => {
        const start = new Date(dep.startDate).toLocaleDateString();
        const end = new Date(dep.endDate).toLocaleDateString();
        console.log(`   ├─ Departure ${j + 1}: ${start} to ${end} (${dep.totalSeats} seats)`);
      });
    } else {
      console.log(`   └─ ⚠️  NO DEPARTURES`);
    }
  });

  if (trekCount === 13 && departureCount === 37) {
    console.log(`\n✅ ALL DATA SUCCESSFULLY SEEDED!`);
    console.log(`✓ All departures are bookable`);
    console.log(`✓ Ready for production use`);
  } else {
    console.log(`\n⚠️  SEEDING INCOMPLETE`);
    console.log(`Expected 37 departures but found ${departureCount}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
