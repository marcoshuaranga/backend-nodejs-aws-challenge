
import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';

const QuerySchema = z.object({
  page: z.string().
    refine(val => /^\d+$/.test(val), { message: 'Must be a number string' })
    .transform(val => Number(val))
    .default(1)
    .openapi({
      description: 'The page number',
      example: 1,
    }),

  limit: z.enum(['10', '20', '50', '100'])
    .transform(val => Number(val))
    .default(10)
    .openapi({
      description: 'The number of results per page',
      example: 10,
    }),
});

const ResponseSchema = z.object({
  total: z.number().min(0).openapi({
    description: 'The total number of items',
    example: 100,
  }),
  totalPages: z.number().min(1).openapi({
    description: 'The total number of pages',
    example: 1,
  }),
  items: z.array(z.object({
    id: z.uuid(),
    ip: z.ipv4(),
    response: z.any(),
    createdAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
  })).openapi({
    description: 'The list of historial',
  }),
}).openapi('Historial')

const route = createRoute({
  method: 'get',
  path: '/historial',
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
      description: 'Retrieve the paginated list of responses',
    },
  },
})

export const historialRoute = route