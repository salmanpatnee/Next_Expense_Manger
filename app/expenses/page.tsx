import prisma from "@/prisma/client";
import { Box, Button, Table } from "@radix-ui/themes";
import Link from "next/link";

const ExpensesPage = async () => {
  const expenses = await prisma.expense.findMany();

  return (
    <Box>
      <Button mb={"3"}>
        <Link href="/expenses/add">Add Expense</Link>
      </Button>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S.No</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Expense</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenses.map((expense, index) => (
            <Table.Row key={expense.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{expense.title}</Table.Cell>
              <Table.Cell>{expense.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ExpensesPage;
