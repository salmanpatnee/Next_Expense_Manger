import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const ExpensesPage = () => {
  return (
    <Button>
      <Link href="/expenses/add">Add Expense</Link>
    </Button>
  );
};

export default ExpensesPage;
