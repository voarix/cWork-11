import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().min(5, "Title is required. The minimum symbols must be 5"),
  description: z
    .string()
    .min(5, "Description is required. The minimum symbols must be 5"),
  price: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)) && +val > 0, {
      message: "Expected number MORE THAN 0, received a string",
    }),
  category: z.string(),
  image: z.instanceof(File).nullable(),
});
