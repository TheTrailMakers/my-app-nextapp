const { sql } = require("./scripts/db-client");

sql`select "slug", "name" from "Trek" order by "slug" asc`.then((treks) => {
  console.log("Total treks in database: " + treks.length);
  console.log("\nTesting batch of 20 random treks:");

  // Test 20 random treks
  const indicesToTest = [];
  for (let i = 0; i < Math.min(20, treks.length); i++) {
    indicesToTest.push(i);
  }

  indicesToTest.forEach((i) => {
    const trek = treks[i];
    console.log(i + 1 + ". " + trek.slug);
  });

  process.exit(0);
});
