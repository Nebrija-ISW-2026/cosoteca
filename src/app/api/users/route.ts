import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email } = body;

  const user = await prisma.user.create({
    data: { name, email },
  });
  return NextResponse.json(user, { status: 201 });
}
