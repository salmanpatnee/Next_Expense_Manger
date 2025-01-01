import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Expense Manager</h1>
      <Button>
        <Link href="/expenses/add">Add Expense</Link>
      </Button>
    </div>
  );
}
