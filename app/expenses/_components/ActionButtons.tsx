import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  id: number;
}

const ActionButtons = ({ id }: Props) => {
  return (
    <Button variant="ghost" className="hover:bg-transparent">
      <Link
        href={`/expenses/edit/${id}`}
        className="text-blue-400 hover:text-blue-600 transition-colors"
      >
        <Pencil1Icon />
      </Link>
    </Button>
  );
};

export default ActionButtons;
