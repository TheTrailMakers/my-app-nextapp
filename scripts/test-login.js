const bcrypt = require("bcryptjs");
const { sql } = require("./db-client");

(async () => {
  try {
    const users = await sql`
      select "id", "password", "isLocked", "isActive"
      from "User"
      where "email" = ${"admin@trailmakers.com"}
      limit 1
    `;
    const user = users[0];
    if (!user) return console.log("no user");
    console.log(
      "user found id",
      user.id,
      "isLocked",
      user.isLocked,
      "isActive",
      user.isActive,
    );
    const ok = await bcrypt.compare("Admin@123456", user.password);
    console.log("password match?", ok);
  } catch (e) {
    console.error(e);
  }
})();
