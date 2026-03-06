const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@trailmakers.com" },
    });

    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Admin@123456", 12);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: "admin@trailmakers.com",
        username: "admin",
        password: hashedPassword,
        firstName: "Admin",
        lastName: "User",
        role: "ADMIN",
        isActive: true,
        isLocked: false,
      },
    });

    console.log("✓ Admin user created successfully");
    console.log("  Email: admin@trailmakers.com");
    console.log("  Username: admin");
    console.log("  Password: Admin@123456");
    console.log("  Role: ADMIN");
    console.log("\n⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("✗ Failed to seed admin user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
