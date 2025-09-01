import { BetterFetchPlugin, createFetch } from "@better-fetch/fetch";
import { apiSchema } from "./api.schema";

export type MoviedbInstance = ReturnType<typeof createMoviedbFetch>;

export const createMoviedbFetch = (params: {
  baseURL?: string;
  plugins?: BetterFetchPlugin[];
  signal?: AbortSignal | null;
  timeout?: number;
  token: string;
}) => createFetch({
  auth: {
    type: 'Bearer',
    token: params.token,
  },
  baseURL: params.baseURL ?? 'https://api.themoviedb.org/3',
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
