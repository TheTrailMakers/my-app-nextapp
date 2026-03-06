const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSuperAdmin() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'superadmin@trailmakers.in' },
      select: { 
        email: true, 
        username: true,
        role: true, 
        isActive: true, 
        isLocked: true, 
        isDenied: true 
      }
    });
    console.log('Superadmin account:', JSON.stringify(user, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkSuperAdmin();
