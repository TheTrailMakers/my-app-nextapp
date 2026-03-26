const { sql } = require("./scripts/db-client");

async function checkSuperAdmin() {
  try {
    const users = await sql`
      select
        "email",
        "username",
        "role",
        "isActive",
        "isLocked",
        "isDenied"
      from "User"
      where "email" = ${"superadmin@trailmakers.in"}
      limit 1
    `;

    console.log(
      "Superadmin account:",
      JSON.stringify(users[0] ?? null, null, 2),
    );
  } catch (e) {
    console.error("Error:", e.message);
  }
}

checkSuperAdmin();
