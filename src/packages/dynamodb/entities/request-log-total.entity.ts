import { Entity, item, number, string, Table } from 'dynamodb-toolbox'

export function createRequestLogTotalEntity(table: InstanceType<typeof Table>) {
  return new Entity({
    name: 'RequestLogTotal',
    table,
    schema: item({
      pk: string().key(true).default('REQUEST_LOG'),
      sk: string().key(true).default('REQUEST_LOG#TOTAL'),
      count: number().default(0),
    }),
    computeKey: ({ pk, sk }: { pk: string; sk: string }) => ({ pk, sk }),
  })
}
