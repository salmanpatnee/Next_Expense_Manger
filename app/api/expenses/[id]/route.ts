import { patchExpenseSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({}, { status: 401 });

//   const ticket = await prisma.ticket.findUnique({
//     where: { id: parseInt(params.id) },
//   });

//   if (!ticket)
//     return NextResponse.json({ error: "Invalid ticket" }, { status: 404 });

//   await prisma.ticket.delete({
//     where: { id: ticket.id },
//   });

//   return NextResponse.json({});
// }
