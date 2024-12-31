import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  (await cookies()).delete("AuthToken");
  return NextResponse.json({ message: "Logout successful" });
}
