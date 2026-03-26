const { sql } = require("./db-client");

async function run() {
  try {
    const expeditions = await sql`select "id" from "Expedition" limit 1`;
    console.log("DB OK", expeditions.length);
  } catch (error) {
    console.error("DB ERR", error.message);
  }
}

run();
