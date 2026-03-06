import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    const role = (session as any)?.user?.role;
    if (!session || !['ADMIN','MODERATOR'].includes(role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Return recent failed attempts grouped by email and count
    const recent = await (prisma as any).failedLoginAttempt.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200
    });

    return NextResponse.json({ success: true, attempts: recent });
  } catch (error) {
    console.error('Failed to fetch login attempts', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
