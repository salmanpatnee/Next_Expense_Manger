import prisma from "@/prisma/client";
import { Expense } from "@prisma/client";
import { Box, Table } from "@radix-ui/themes";
import ActionButtons from "../_components/ActionButtons";
import ExpenseAction from "../_components/ExpenseAction";

const ExpensesPage = async () => {
  const expenses: Expense[] = await prisma.expense.findMany();

  return (
    <Box className="space-y-4">
      <ExpenseAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S.No</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Expense</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenses.map((expense, index) => (
            <Table.Row key={expense.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{expense.title}</Table.Cell>
              <Table.Cell>{expense.amount}</Table.Cell>
              <Table.Cell>{expense.date.toDateString()}</Table.Cell>
              <Table.Cell>
                <ActionButtons id={expense.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ExpensesPage;
