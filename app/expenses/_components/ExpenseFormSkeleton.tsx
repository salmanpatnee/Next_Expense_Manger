import { Box, Skeleton } from "@radix-ui/themes";

const ExpenseFormSkeleton = () => {
  return (
    <Box className="space-y-5">
      <Skeleton width={"575px"} height={"40px"} />
      <Skeleton width={"575px"} height={"40px"} />
      <Skeleton width={"110px"} height={"40px"} />
    </Box>
  );
};

export default ExpenseFormSkeleton;
