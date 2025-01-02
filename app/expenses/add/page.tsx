"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpenseSchema } from "@/app/validationSchemas";
import {z} from "zod"
import ErrorMessage from "@/app/components/ErrorMessage";



// Instead of creating an interface
/* interface ExpenseForm {
  title: string
}*/

//Created a type based on zod schema
type ExpenseForm = z.infer<typeof createExpenseSchema>

const AddExpensePage = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<ExpenseForm>({
    resolver: zodResolver(createExpenseSchema)
  });
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root
          type="number"
          placeholder="1200"
          size={"3"}
          {...register("amount")}
        />
        <ErrorMessage>{errors.amount?.message}</ErrorMessage>
        <Button>Add Expense</Button>
      </form>
    </div>
  );
};

export default AddExpensePage;
