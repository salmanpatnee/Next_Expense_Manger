import authOptions from "@/app/auth/authOptions";
import { patchExpenseSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = patchExpenseSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { title, amount } = body;

  const expense = await prisma.expense.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!expense)
    return NextResponse.json({ error: "Invalid expense" }, { status: 404 });

  const updatedExpense = await prisma.expense.update({
    where: { id: expense.id },
    data: {
      title,
      amount: parseFloat(amount),
    },
  });

  return NextResponse.json(updatedExpense);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const expense = await prisma.expense.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!expense)
    return NextResponse.json({ error: "Invalid expense" }, { status: 404 });

  await prisma.expense.delete({
    where: { id: expense.id },
  });

  return NextResponse.json({});
}
