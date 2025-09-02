import { any, Entity, map, string, Table } from 'dynamodb-toolbox'
import { randomUUID } from 'node:crypto'

export function createRequestLogEntity(table: InstanceType<typeof Table>) {
  return new Entity({
    name: 'RequestLog',
    table,
    schema: map({
      pk: string().key(true).default('REQUEST_LOG'),
      sk: string().key(true).default(() => `TS#${new Date().toISOString()}#${randomUUID()}`),
      ip: string().required(),
      method: string().required(),
      path: string().required(),
      response: any().required(),
      createdAt: string().default(() => new Date().toISOString()),
    }),
    computeKey: ({ pk, sk }: { pk: string; sk: string }) => ({ pk, sk }),
  })
}
