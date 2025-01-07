import authOptions from "@/app/auth/authOptions";
import { createExpenseSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }


  const body = await request.json();

  const validation = createExpenseSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email! },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const newExpense = await prisma.expense.create({
      data: {
        title: body.title,
        amount: parseFloat(body.amount),
        userId: user.id,
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
};
