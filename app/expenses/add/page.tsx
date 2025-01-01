"use client";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
interface ExpenseForm {
  title: string;
  amount: number;
}

const AddExpensePage = () => {
  const { register, handleSubmit } = useForm<ExpenseForm>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post(`/api/expenses`, data);
        router.push(`/expenses`)
      })}
    >
      <TextField.Root
        placeholder="Internet Fee"
        size={"3"}
        {...register("title")}
      />
      <TextField.Root
        type="number"
        placeholder="1200"
        size={"3"}
        {...register("amount")}
      />
      <Button>Add Expense</Button>
    </form>
  );
};

export default AddExpensePage;
