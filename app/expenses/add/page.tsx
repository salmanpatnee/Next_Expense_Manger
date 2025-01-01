import { Button, TextField } from "@radix-ui/themes";
import React from "react";

const AddExpensePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Internet Fee" size={"3"} />
      <TextField.Root type="number" placeholder="1200" size={"3"} />
      <Button>Add Expense</Button>
    </div>
  );
};

export default AddExpensePage;
