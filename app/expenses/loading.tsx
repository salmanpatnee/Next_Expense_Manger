import { Box, Skeleton, Table, Text } from "@radix-ui/themes";
import React from "react";
import ExpenseAction from "./_components/ExpenseAction";

const ExpenseLoadingPage = () => {
  const expenses = [1, 2, 3, 4, 5];
  return (
    <Box className="space-y-3">
      <ExpenseAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S.No</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Expense</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {expenses.map((expense) => (
            <Table.Row key={expense}>
              <Table.Cell>
                <Text>
                  <Skeleton>1000</Skeleton>
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>
                  <Skeleton>Bike Petrol</Skeleton>
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>
                  <Skeleton>1000</Skeleton>
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>
                  <Skeleton>Thursday, 2 January 2025</Skeleton>
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default ExpenseLoadingPage;
