"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { createExpenseSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Expense } from "@prisma/client";
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { z } from "zod";

// Instead of creating an interface
/* interface ExpenseForm {
  title: string
}*/

//Created a type based on zod schema
type ExpenseForm = z.infer<typeof createExpenseSchema>;

interface Props {
  expense?: Expense;
}

const ExpenseForm = ({ expense }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseForm>({
    resolver: zodResolver(createExpenseSchema),
  });

  const handleOnSubmit = handleSubmit(async (data) => {
    try {
      setSubmit(true);
      if (expense) {
        await axios.patch(`/api/expenses/${expense.id}`, data);
      } else {
        await axios.post(`/api/expenses`, data);
      }
      router.push(`/expenses/list`);
      router.refresh();
      setError("");
    } catch (error) {
      setSubmit(false);
      setError("An unexpected error is occured.");
    }
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmit] = useState(false);

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root mb={"3"}>
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={handleOnSubmit}>
        <TextField.Root
          defaultValue={expense?.title}
          placeholder="Internet Fee"
          size={"3"}
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root
          defaultValue={expense?.amount}
          type="number"
          placeholder="1200"
          size={"3"}
          {...register("amount")}
        />
        <ErrorMessage>{errors.amount?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {expense ? "Update Expense" : "Add Expense"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ExpenseForm;
