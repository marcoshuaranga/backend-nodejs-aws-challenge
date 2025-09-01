import { z } from "zod/mini";

export const idParamSchema = z.object({
  id: z.int()
});
