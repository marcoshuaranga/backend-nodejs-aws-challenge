import { createSchema } from "@better-fetch/fetch";
import { movieDetailSchema, searchMoviesQuery, searchMoviesSchema } from "./schemas/moviedb.schema";

export const apiSchema = createSchema({
  '@get/search/movie': {
    query: searchMoviesQuery,
    output: searchMoviesSchema,
  },
  '@get/movie/:movie_id': {
    output: movieDetailSchema,
  },
})