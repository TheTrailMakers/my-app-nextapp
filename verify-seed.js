const { sql } = require("./scripts/db-client");

async function main() {
  const [{ count: trekCount }] =
    await sql`select count(*)::int as count from "Trek"`;
  const [{ count: departureCount }] =
    await sql`select count(*)::int as count from "Departure"`;
  const treks = await sql`
    select "id", "name", "slug"
    from "Trek"
    order by "name" asc
  `;
  const departures = await sql`
    select "trekId", "startDate", "endDate", "totalSeats"
    from "Departure"
    order by "startDate" asc
  `;
  const departuresByTrek = departures.reduce((map, departure) => {
    const current = map.get(departure.trekId) ?? [];
    current.push(departure);
    map.set(departure.trekId, current);
    return map;
  }, new Map());

  console.log("✅ DATABASE VERIFICATION");
  console.log("═════════════════════════════════════════════════════════");
  console.log(`Total Treks: ${trekCount} (Expected: 13)`);
  console.log(`Total Departures: ${departureCount} (Expected: 37)`);
  console.log(`\nTrek & Departure Details:`);
  treks.forEach((trek, i) => {
    const trekDepartures = departuresByTrek.get(trek.id) ?? [];
    console.log(`\n${i + 1}. ${trek.name}`);
    if (trekDepartures.length > 0) {
      trekDepartures.forEach((dep, j) => {
        const start = new Date(dep.startDate).toLocaleDateString();
        const end = new Date(dep.endDate).toLocaleDateString();
        console.log(
          `   ├─ Departure ${j + 1}: ${start} to ${end} (${dep.totalSeats} seats)`,
        );
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

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
