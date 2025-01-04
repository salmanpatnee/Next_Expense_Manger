import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
    id: number
  }

const DeleteButton = ({id}: Props) => {
  return (
    <Button variant="ghost" className="hover:bg-transparent">
      <Link
        href={`/expenses/edit/${id}`}
        className="text-red-400 hover:text-red-600 transition-colors"
      >
        <TrashIcon />
      </Link>
    </Button>
  );
};

export default DeleteButton;
