import { Entity, item, number, string, Table } from 'dynamodb-toolbox'
import { randomUUID } from 'node:crypto'

export function createPokemonEntity(table: InstanceType<typeof Table>) {
  return new Entity({
    name: 'Pokemon',
    table,
    schema: item({
      pk: string().key(true).default('POKEMON'),
      sk: string().key(true).default(() => randomUUID()),
      name: string().required(),
      type: string().required(),
      level: number().required(),
    }),
    computeKey: ({ pk, sk }: { pk: string; sk: string }) => ({ pk, sk }),
  })
}
