import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import ExpenseForm from "../../_components/ExpenseForm";

interface Props {
  params: { id: string };
}

const EditExpensePage = async ({ params }: Props) => {
  const expense = await prisma.expense.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!expense) {
    notFound();
  }

  return <ExpenseForm expense={expense} />;
};

export default EditExpensePage;
