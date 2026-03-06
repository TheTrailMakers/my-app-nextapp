const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seedSuperAdmin() {
  try {
    const existing = await prisma.user.findUnique({ where: { email: "superadmin@trailmakers.in" } });
    if (existing) {
      console.log("✓ Super admin already exists");
      return;
    }

    const hashed = await bcrypt.hash("superAdmin@123456", 12);

    const user = await prisma.user.create({
      data: {
        email: "superadmin@trailmakers.in",
        username: "superadmin",
        password: hashed,
        firstName: "Super",
        lastName: "Admin",
        role: "SUPER_ADMIN",
        isActive: true,
        isLocked: false,
      }
    });

    console.log("✓ Super admin created:");
    console.log("  Email: superadmin@trailmakers.in");
    console.log("  Username: superadmin");
    console.log("  Password: superAdmin@123456");
    console.log("  Role: SUPER_ADMIN");
    console.log("\n⚠️  Please change the password after first login!");
  } catch (e) {
    console.error('Failed to create super admin', e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

seedSuperAdmin();
