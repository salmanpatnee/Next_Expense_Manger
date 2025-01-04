import { Badge } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ExpenseBadge = ({ children }: PropsWithChildren) => {
  return <Badge color="red">-{children}</Badge>;
};

export default ExpenseBadge;
