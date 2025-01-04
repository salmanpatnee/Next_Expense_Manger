import { ExpenseBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Expense } from "@prisma/client";
import { Box, Flex, Table } from "@radix-ui/themes";
import DeleteButton from "../_components/DeleteButton";
import EditButton from "../_components/EditButton";
import ExpenseAction from "../_components/ExpenseAction";

const ExpensesPage = async () => {
  const expenses: Expense[] = await prisma.expense.findMany();

  return (
    <Box className="space-y-4">
      <ExpenseAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Expense</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Amount
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenses.map((expense) => (
            <Table.Row key={expense.id}>
              <Table.Cell>
                {expense.title}
                <div className="block md:hidden  text-red-400"><ExpenseBadge>{expense.amount}</ExpenseBadge></div>
                <div className="block md:hidden  text-xs italic mt-1">
                  {expense.date.toDateString()}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <ExpenseBadge>{expense.amount}</ExpenseBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {expense.date.toDateString()}
              </Table.Cell>
              <Table.Cell>
                <Flex gap={"3"}>
                  <EditButton id={expense.id} />
                  <DeleteButton id={expense.id} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export const dynamic = "force-cache";

export default ExpensesPage;
