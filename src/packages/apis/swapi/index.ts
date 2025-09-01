import { BetterFetchPlugin, createFetch } from "@better-fetch/fetch";
import { apiSchema } from "./api.schema";

export type SwapiInstance = ReturnType<typeof createSwapiFetch>;

export const createSwapiFetch = (params: {
  baseURL?: string;
  plugins?: BetterFetchPlugin[];
  signal?: AbortSignal | null;
  timeout?: number;
}) => createFetch({
  baseURL: params.baseURL ?? 'https://swapi.py4e.com/api',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
  },
  plugins: params.plugins,
  retry: {
    type: 'linear',
    attempts: 2,
    delay: 1000,
  },
  schema: apiSchema,
  timeout: params.timeout ?? 5000,
  throw: true,
  signal: params.signal,
});
