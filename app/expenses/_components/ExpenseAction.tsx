import { Box, Button } from "@radix-ui/themes";
import Link from "next/link";

const ExpenseAction = () => {
  return (
    <Box>
      <Button>
        <Link href="/expenses/add">Add Expense</Link>
      </Button>
    </Box>
  );
};

export default ExpenseAction;
