import { NextResponse } from 'next/server';
import { checkUserRole, logAudit } from '@/lib/roleUtils';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

// GET all users
export async function GET(request: Request) {
  const { authorized, user } = await checkUserRole('ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const page = parseInt(searchParams.get('page') || '1');

    const where: any = {};
    if (role) where.role = role;

    const [users, total] = await Promise.all([
      (prisma as any).user.findMany({
        where,
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true,
          isLocked: true,
          isDenied: true,
          accountLockedUntil: true,
          lastLoginAt: true,
          createdAt: true
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      (prisma as any).user.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// CREATE a new user (admin only)
export async function POST(request: Request) {
  const { authorized, user: adminUser } = await checkUserRole('ADMIN');
  
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { email, username, password, firstName, lastName, role } = await request.json();

    // Validate input
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: 'Email, username, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await (prisma as any).user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Email or username already exists' },
        { status: 400 }
      );
    }

    // Hash password (in production, use bcrypt)
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await (prisma as any).user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || 'USER',
        isActive: true
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      }
    });

    await logAudit(
      'USER_CREATED',
      'USER',
      newUser.id,
      adminUser.id,
      { email, username, role: role || 'USER' }
    );

    return NextResponse.json({
      success: true,
      user: newUser
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
