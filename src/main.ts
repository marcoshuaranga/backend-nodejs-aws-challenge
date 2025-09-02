import type { EnvironmentVariables } from './env'
import type { KeyvInstance } from './packages/keyv'
import type { MoviedbInstance } from './packages/apis/moviedb'
import type { SwapiInstance } from './packages/apis/swapi'
import type { LambdaContext, ApiGatewayRequestContextV2 } from 'hono/aws-lambda'
import { OpenAPIHono } from '@hono/zod-openapi'
import { handle } from 'hono/aws-lambda'
import { fusionadosRoute } from './routes/fusionados'
import { getFilmWithDetails } from './app/queries/get-film-with-details'
import { bootstrap } from './bootstrap'
import { swaggerUI } from '@hono/swagger-ui'
import { almacenarRoute } from './routes/almacenar'
import { historialRoute } from './routes/historial'
import { getRequestLogs } from './app/queries/get-request-logs'
import { SingleTableInstance } from './packages/dynamodb'
import { addPokemon } from './app/commands/add-pokemon'
import { env } from 'hono/adapter'
import { addRequestLogCommand } from './app/commands/add-request-log'

type Bindings = {
  event?: ApiGatewayRequestContextV2
  lambdaContext?: LambdaContext
}

type Variables = {
  app: {
    keyv: KeyvInstance,
    moviedb: MoviedbInstance,
    swapi: SwapiInstance
    singleTable: SingleTableInstance
  }
}

const app = new OpenAPIHono<{ Bindings: Bindings, Variables: Variables }>()

app.use(async (c, next) => {
  c.set('app', bootstrap(env<EnvironmentVariables>(c)))

  await next()
})

app.openapi(almacenarRoute, async (c) => {
  const body = c.req.valid('json')
  const result = await addPokemon({ db: c.get('app').singleTable }, body.pokemon)

  return c.json(result)
})

app.openapi(fusionadosRoute, async (c) => {
  const { keyv, moviedb, swapi } = c.get('app')

  const query = c.req.valid('query')
  const result = await getFilmWithDetails({ keyv, moviedb, swapi }, query)

  await addRequestLogCommand({ db: c.get('app').singleTable }, {
    ip: (c.env && c.env.event) ? c.env.event.http.sourceIp : '127.0.0.1',
    method: c.req.method,
    path: c.req.path,
    response: result,
    status: 200,
  })

  return c.json(result)
})

app.openapi(historialRoute, async (c) => {
  const query = c.req.valid('query')
  const result = await getRequestLogs({ db: c.get('app').singleTable }, query)

  return c.json({
    total: result.items.length,
    totalPages: 1,
    items: result.items.map(item => ({
      id: item.id,
      ip: item.ip,
      path: item.path,
      response: item.response,
      createdAt: item.createdAt,
    })),
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

export const hono = app;

export const handler = handle(app)