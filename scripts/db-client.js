const path = require("path");
const dotenv = require("dotenv");
const { neon } = require("@neondatabase/serverless");

dotenv.config({ path: path.join(__dirname, "../.env.local") });
dotenv.config({ path: path.join(__dirname, "../.env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);

module.exports = { sql };
