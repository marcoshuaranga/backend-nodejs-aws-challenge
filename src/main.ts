import type { KeyvInstance } from './packages/keyv'
import type { MoviedbInstance } from './packages/apis/moviedb'
import type { SwapiInstance } from './packages/apis/swapi'
import type { LambdaEvent, LambdaContext } from 'hono/aws-lambda'
import { OpenAPIHono } from '@hono/zod-openapi'
import { handle } from 'hono/aws-lambda'
import { fusionadosRoute } from './routes/fusionados'
import { getFilmWithDetails } from './app/queries/get-film-with-details'
import { bootstrap } from './bootstrap'
import { swaggerUI } from '@hono/swagger-ui'
import { almacenarRoute } from './routes/almacenar'
import { randomUUID } from 'node:crypto'
import { historialRoute } from './routes/historial'

type Bindings = {
  event: LambdaEvent
  lambdaContext: LambdaContext
}

type Variables = {
  app: {
    keyv: KeyvInstance,
    moviedb: MoviedbInstance,
    swapi: SwapiInstance
  }
}

const app = new OpenAPIHono<{ Bindings: Bindings, Variables: Variables }>()

app.use(async (c, next) => {
  c.set('app', bootstrap())

  await next()
})

app.openapi(almacenarRoute, async (c) => {
  const body = c.req.valid('json')
  const result = {
    ...body.pokemon,
    id: randomUUID()
  }

  return c.json(result)
})

app.openapi(fusionadosRoute, async (c) => {
  const { keyv, moviedb, swapi } = c.get('app')

  const query = c.req.valid('query')
  const result = await getFilmWithDetails({ keyv, moviedb, swapi }, query)

  return c.json(result)
})

app.openapi(historialRoute, async (c) => {
  const _ = c.req.valid('query')

  return c.json({
    total: 0,
    totalPages: 0,
    items: [],
  })
})

app.get('/health', (c) => c.json({ status: 'ok' }))

app.doc('/docs', {
  openapi: '3.0.0',
  info: {
    version: '0.1.0',
    title: 'Backend Nodejs AWS Challenge API',
    contact: {
      name: 'Marcos David Huaranga Ortega',
      email: 'marcoshuaranga@outlook.com',
      url: 'https://github.com/marcoshuaranga',
    },
    description: 'API for the Backend Nodejs AWS Challenge',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/license/mit/',
    }
  },
  servers: [
    {
      url: 'https://vs2vtevevj.execute-api.us-east-1.amazonaws.com',
      description: 'Development server'
    },
  ],
})

app.get('/', swaggerUI({ url: '/docs' }))

export const handler = handle(app)