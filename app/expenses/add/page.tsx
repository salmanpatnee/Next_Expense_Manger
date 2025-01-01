"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
interface ExpenseForm {
  title: string;
  amount: number;
}

const AddExpensePage = () => {
  const { register, handleSubmit } = useForm<ExpenseForm>();
  const router = useRouter();
  const [error, setError] = useState("");

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
      <form className="space-y-5"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post(`/api/expenses`, data);
            router.push(`/expenses`);
            setError('')
          } catch (error) {
            setError("An unexpected error is occured.");
          }
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
    </div>
  );
};

export default AddExpensePage;
