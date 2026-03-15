import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await prisma.item.findMany({
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, imageUrl, ownerId } = body;

  const item = await prisma.item.create({
    data: { name, description, imageUrl, ownerId },
  });
  return NextResponse.json(item, { status: 201 });
}
