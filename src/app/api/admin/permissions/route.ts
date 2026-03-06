import { NextResponse } from 'next/server';
import { checkUserRole } from '@/lib/roleUtils';
import { prisma } from '@/lib/prisma';

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
    MANAGE_ROLES: { ADMIN: false, MODERATOR: false }, // Only Super Admin
    VIEW_AUDIT_LOGS: { ADMIN: true, MODERATOR: false }
  }
};

// GET /api/admin/permissions - Get all permissions
export async function GET(request: Request) {
  const { authorized, user } = await checkUserRole('SUPER_ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized - Super Admin only' }, { status: 403 });
  }

  try {
    // Get all permissions
    const permissions = await (prisma as any).adminPermission.findMany({
      include: {
        roles: true
      },
      orderBy: [{ category: 'asc' }, { permission: 'asc' }]
    });

    // Group by category
    const grouped = permissions.reduce((acc: any, p: any) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push({
        ...p,
        roles: p.roles.reduce((r: any, role: any) => {
          r[role.role] = role.isEnabled;
          return r;
        }, {})
      });
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      permissions: grouped
    });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch permissions' },
      { status: 500 }
    );
  }
}

// POST /api/admin/permissions - Initialize default permissions
export async function POST(request: Request) {
  const { authorized } = await checkUserRole('SUPER_ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized - Super Admin only' }, { status: 403 });
  }

  try {
    // Check if permissions already exist
    const existing = await (prisma as any).adminPermission.count();
    if (existing > 0) {
      return NextResponse.json({
        message: 'Permissions already initialized'
      });
    }

    // Create all permissions
    const createdPermissions = [];
    
    for (const [category, perms] of Object.entries(DEFAULT_PERMISSIONS)) {
      for (const [permission, roles] of Object.entries(perms as any)) {
        const created = await (prisma as any).adminPermission.create({
          data: {
            permission,
            category,
            description: `${permission} - ${category}`
          }
        });
        createdPermissions.push(created);

        // Create role permissions
        for (const [role, isEnabled] of Object.entries(roles as any)) {
          await (prisma as any).rolePermission.create({
            data: {
              permissionId: created.id,
              role,
              isEnabled
            }
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Permissions initialized successfully',
      count: createdPermissions.length
    });
  } catch (error) {
    console.error('Error initializing permissions:', error);
    return NextResponse.json(
      { error: 'Failed to initialize permissions' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/permissions - Update role permissions
export async function PUT(request: Request) {
  const { authorized } = await checkUserRole('SUPER_ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized - Super Admin only' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { role, permissions } = body;

    if (!role || !permissions) {
      return NextResponse.json(
        { error: 'Role and permissions are required' },
        { status: 400 }
      );
    }

    // Update each permission for the role
    for (const [permission, isEnabled] of Object.entries(permissions)) {
      // Find the permission
      const perm = await (prisma as any).adminPermission.findUnique({
        where: { permission }
      });

      if (perm) {
        // Check if role permission exists
        const existing = await (prisma as any).rolePermission.findFirst({
          where: {
            permissionId: perm.id,
            role
          }
        });

        if (existing) {
          // Update
          await (prisma as any).rolePermission.update({
            where: { id: existing.id },
            data: { isEnabled: !!isEnabled }
          });
        } else {
          // Create
          await (prisma as any).rolePermission.create({
            data: {
              permissionId: perm.id,
              role,
              isEnabled: !!isEnabled
            }
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Permissions updated successfully'
    });
  } catch (error) {
    console.error('Error updating permissions:', error);
    return NextResponse.json(
      { error: 'Failed to update permissions' },
      { status: 500 }
    );
  }
}
