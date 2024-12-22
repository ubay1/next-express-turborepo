// import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const token = (await cookies()).get("AuthToken")?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-user-data`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
  const finalData = await response.json();
  return NextResponse.json(finalData);
}
