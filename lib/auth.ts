import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";
import { verifySessionToken, SESSION_COOKIE } from "./session";

export { createSessionToken, SESSION_COOKIE } from "./session";

/** Constant-time password check (hashes first so lengths always match). */
export function checkPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = createHash("sha256").update(submitted).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** For server actions & pages: true when the request carries a valid session. */
export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? verifySessionToken(token) : false;
}

/** Guard for mutating server actions — middleware alone is not sufficient. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}
