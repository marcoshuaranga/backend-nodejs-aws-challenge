import { z } from "zod/mini"
import { planifyZodIssues } from "../utils/helpers";

const configSchema = z.object({
  swapiUrl: z.string().check(z.url()),
  moviedbUrl: z.string().check(z.url()),
  moviedbApiToken: z.string().check(z.minLength(32)),
  dynamoDbTableName: z.optional(z.string().check(z.minLength(3)))
});

export type Config = z.infer<typeof configSchema>;
export type OptionalConfig = Partial<Config>;

export const createConfig = (values: OptionalConfig) => {
  const result = configSchema.safeParse(values);

  if (!result.success) {
    throw new Error(`Invalid configuration: ${JSON.stringify(planifyZodIssues(result.error.issues))}`, {
      cause: result.error
    });
  }

  return result.data;
}