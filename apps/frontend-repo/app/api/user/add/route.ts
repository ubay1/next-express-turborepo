// import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { data } = await request.json();
  const token = (await cookies()).get("AuthToken")?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-user-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  const finalData = await response.json();
  return NextResponse.json(finalData);
}
