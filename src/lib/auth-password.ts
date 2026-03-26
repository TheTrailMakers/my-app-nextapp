import bcrypt from "bcryptjs";

export async function hashAuthPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyAuthPassword({
  hash,
  password,
}: {
  hash: string;
  password: string;
}) {
  return bcrypt.compare(password, hash);
}
