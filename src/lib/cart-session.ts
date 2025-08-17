import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE = "cart_session";
const ONE_YEAR = 60 * 60 * 24 * 365;

export function getOrSetCartSession() {
  const jar = cookies();
  let sid = jar.get(COOKIE)?.value;
  if (!sid) {
    sid = randomUUID();
    jar.set(COOKIE, sid, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: ONE_YEAR,
    });
  }
  return sid;
}
