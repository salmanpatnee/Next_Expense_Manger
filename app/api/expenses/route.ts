import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createExpenseSchema } from "@/app/validationSchemas";

export const POST = async (request: NextRequest) => {

    const body = await request.json();

    const validation = createExpenseSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    try {
        const newExpense = await prisma.expense.create({
            data: {
                title: body.title,
                amount: parseFloat(body.amount) 
            },
        });

        return NextResponse.json(newExpense, { status: 201 });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
    }
};