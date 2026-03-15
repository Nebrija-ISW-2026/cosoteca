import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const loans = await prisma.loan.findMany({
    include: { item: true, borrower: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(loans);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { itemId, borrowerId, endDate } = body;

  const loan = await prisma.loan.create({
    data: {
      itemId,
      borrowerId,
      endDate: endDate ? new Date(endDate) : undefined,
      status: "ACTIVE",
    },
  });

  await prisma.item.update({
    where: { id: itemId },
    data: { available: false },
  });

  return NextResponse.json(loan, { status: 201 });
}
