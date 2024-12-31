// import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("AuthToken")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fetch-user-data`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return NextResponse.json(data);
}
