"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { createExpenseSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
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

const AddExpensePage = () => {
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
      await axios.post(`/api/expenses`, data);
      router.push(`/expenses/list`);
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
        <Button disabled={isSubmitting}>
          Add Expense {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default AddExpensePage;
