-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "userId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
