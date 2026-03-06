const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Default permissions for each role
const DEFAULT_PERMISSIONS = {
  DASHBOARD: {
    VIEW_DASHBOARD: { ADMIN: true, MODERATOR: true },
    VIEW_OVERVIEW_STATS: { ADMIN: true, MODERATOR: true }
  },
  TREKS: {
    VIEW_TREKS: { ADMIN: true, MODERATOR: true },
    CREATE_TREK: { ADMIN: true, MODERATOR: false },
    EDIT_TREK: { ADMIN: true, MODERATOR: false },
    DELETE_TREK: { ADMIN: true, MODERATOR: false },
    MANAGE_DEPARTURES: { ADMIN: true, MODERATOR: false },
    ASSIGN_TREK_LEADER: { ADMIN: true, MODERATOR: false }
  },
  PARTICIPANTS: {
    VIEW_PARTICIPANTS: { ADMIN: true, MODERATOR: true },
    VIEW_MEDICAL_FORMS: { ADMIN: true, MODERATOR: true },
    VERIFY_ID: { ADMIN: true, MODERATOR: true },
    MANAGE_WAIVERS: { ADMIN: true, MODERATOR: true }
  },
  FINANCE: {
    VIEW_FINANCE: { ADMIN: true, MODERATOR: false },
    VIEW_PAYMENTS: { ADMIN: true, MODERATOR: false },
    PROCESS_PAYOUTS: { ADMIN: true, MODERATOR: false },
    VIEW_GST: { ADMIN: true, MODERATOR: false }
  },
  MARKETING: {
    VIEW_MARKETING: { ADMIN: true, MODERATOR: false },
    EDIT_MARKETING_METRICS: { ADMIN: true, MODERATOR: false }
  },
  REVIEWS: {
    VIEW_REVIEWS: { ADMIN: true, MODERATOR: true },
    MODERATE_REVIEWS: { ADMIN: true, MODERATOR: true }
  },
  USERS: {
    VIEW_USERS: { ADMIN: true, MODERATOR: false },
    CREATE_USERS: { ADMIN: true, MODERATOR: false },
    EDIT_USERS: { ADMIN: true, MODERATOR: false },
    DELETE_USERS: { ADMIN: true, MODERATOR: false },
    MANAGE_ROLES: { ADMIN: false, MODERATOR: false },
    VIEW_AUDIT_LOGS: { ADMIN: true, MODERATOR: false }
  }
};

async function seedPermissions() {
  console.log('Seeding permissions...');

  try {
    // Check if permissions already exist
    const existingCount = await prisma.adminPermission.count();
    if (existingCount > 0) {
      console.log(`Permissions already initialized (${existingCount} permissions found)`);
      return;
    }

    // Create all permissions
    for (const [category, perms] of Object.entries(DEFAULT_PERMISSIONS)) {
      for (const [permission, roles] of Object.entries(perms)) {
        const created = await prisma.adminPermission.create({
          data: {
            permission,
            category,
            description: `${permission} - ${category}`
          }
        });
        console.log(`Created permission: ${permission} (${category})`);

        // Create role permissions
        for (const [role, isEnabled] of Object.entries(roles)) {
          await prisma.rolePermission.create({
            data: {
              permissionId: created.id,
              role,
              isEnabled
            }
          });
          console.log(`  - ${role}: ${isEnabled ? 'enabled' : 'disabled'}`);
        }
      }
    }

    console.log('Permissions seeded successfully!');
  } catch (error) {
    console.error('Error seeding permissions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPermissions();
