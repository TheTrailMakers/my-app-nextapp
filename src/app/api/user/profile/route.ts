import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { getAppSession } from "@/lib/auth-session";

const profileFields = {
  id: userTable.id,
  email: userTable.email,
  username: userTable.username,
  firstName: userTable.firstName,
  lastName: userTable.lastName,
  phoneNumber: userTable.phoneNumber,
  address: userTable.address,
  city: userTable.city,
  state: userTable.state,
  pincode: userTable.pincode,
  role: userTable.role,
};

function toNullableText(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

type ProfileUpdateInput = {
  updatedAt: Date;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
};

// GET user profile
export async function GET() {
  const session = await getAppSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await db
      .select(profileFields)
      .from(userTable)
      .where(eq(userTable.id, session.user.id))
      .limit(1);
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

// UPDATE user profile
export async function PATCH(request: Request) {
  const session = await getAppSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const updates: ProfileUpdateInput = {
      updatedAt: new Date(),
    };

    if ("firstName" in body) {
      updates.firstName = toNullableText(body.firstName);
    }
    if ("lastName" in body) {
      updates.lastName = toNullableText(body.lastName);
    }
    if ("phoneNumber" in body) {
      updates.phoneNumber = toNullableText(body.phoneNumber);
    }
    if ("address" in body) {
      updates.address = toNullableText(body.address);
    }
    if ("city" in body) {
      updates.city = toNullableText(body.city);
    }
    if ("state" in body) {
      updates.state = toNullableText(body.state);
    }
    if ("pincode" in body) {
      updates.pincode = toNullableText(body.pincode);
    }

    const users = await db
      .update(userTable)
      .set(updates)
      .where(eq(userTable.id, session.user.id))
      .returning(profileFields);
    const user = users[0];

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
