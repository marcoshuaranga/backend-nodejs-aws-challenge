import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';

const QuerySchema = z.object({
  filmId: z.string()
    .refine(val => /^\d+$/.test(val), { message: 'Must be a number string' })
    .transform(val => Number(val))
    .openapi({
      description: 'The ID of the film',
      example: 3,
    }),
});

const ResponseSchema = z.object({
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.string(),
  details: z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    genre_ids: z.array(z.int()),
    id: z.int(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.int(),
  }).nullable(),
}).openapi('FilmWithDetails')

const route = createRoute({
  method: 'get',
  path: '/fusionados',
  middleware: [zValidator('query', QuerySchema)],
  request: {
    query: QuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
        },
      },
      description: 'Retrieve the fusionados',
    },
  },
})

export const fusionadosRoute = route