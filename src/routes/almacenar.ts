import { z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';

const BodySchema = z.object({
  pokemon: z.object({
    name: z.string().min(2).max(100),
    type: z.enum(['fire', 'water', 'grass']),
    level: z.number().min(1).max(100),
  }).openapi({
    example: {
      name: 'Pikachu',
      type: 'electric',
      level: 35,
    },
    description: 'The Pokemon to store',
    required: ['name', 'type', 'level'],
  }),
});

const ResponseSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2).max(100),
  type: z.enum(['fire', 'water', 'grass']),
  level: z.number().min(1).max(100),
}).openapi('Pokemon')

const route = createRoute({
  method: 'post',
  path: '/almacenar',
  middleware: [zValidator('json', BodySchema)],
  request: {
    body: {
      description: 'The Pokemon to store',
      required: true,
      content: {
        'application/json': {
          schema: BodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
        },
      },
      description: 'Retrieve the Pokemon',
    },
  },
})

export const almacenarRoute = route