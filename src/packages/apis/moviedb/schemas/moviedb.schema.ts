import { z } from "zod/mini";

export const movieResultSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.nullable(z.string()),
  genre_ids: z.array(z.int()),
  id: z.int(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.nullable(z.string()),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.int(),
});

export const searchMoviesQuery = z.object({
  query: z.string(),
  year: z.optional(z.string()),
});


export const searchMoviesSchema = z.object({
  page: z.int(),
  results: z.array(movieResultSchema),
  total_pages: z.int(),
  total_results: z.int(),
});

export const movieDetailSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.nullable(z.string()),
  belongs_to_collection: z.nullable(
    z.object({
      id: z.number(),
      name: z.string(),
      poster_path: z.nullable(z.string()),
      backdrop_path: z.nullable(z.string()),
    })
  ),
  budget: z.number(),
  genres: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  homepage: z.nullable(z.string()),
  id: z.number(),
  imdb_id: z.nullable(z.string()),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.nullable(z.string()),
  popularity: z.number(),
  poster_path: z.nullable(z.string()),
  production_companies: z.array(z.object({
    id: z.number(),
    logo_path: z.nullable(z.string()),
    name: z.string(),
    origin_country: z.string(),
  })),
  production_countries: z.array(z.object({
    iso_3166_1: z.string(),
    name: z.string(),
  })),
  release_date: z.nullable(z.string()),
  revenue: z.number(),
  runtime: z.nullable(z.number()),
  spoken_languages: z.array(z.object({
    english_name: z.string(),
    iso_639_1: z.string(),
    name: z.string(),
  })),
  status: z.string(),
  tagline: z.nullable(z.string()),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});
