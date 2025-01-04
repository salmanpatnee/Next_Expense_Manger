import { z } from "zod"

export const createExpenseSchema = z.object({
    title: z.string().min(3, 'Title is required').max(1000),
    amount: z.string().min(1, 'An amount is required')
});

export const patchExpenseSchema = z.object({
    title: z.string().min(3, 'Title is required').max(1000),
    amount: z.string().min(1, 'An amount is required')
});
