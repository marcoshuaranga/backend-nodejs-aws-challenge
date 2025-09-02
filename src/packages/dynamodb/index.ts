import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { EntityRepository, Table } from "dynamodb-toolbox";
import { createPokemonEntity } from "./entities/pokemon.entity";
import { createRequestLogEntity } from "./entities/request-log.entity";
import { createRequestLogTotalEntity } from "./entities/request-log-total.entity";

export type SingleTableInstance = ReturnType<typeof createSingleTable>;

export function createSingleTable(props: {
  dynamoDBClient: DynamoDBClient,
  tableName: string
}) {
  const documentClient = DynamoDBDocumentClient.from(props.dynamoDBClient, {
    marshallOptions: {
      convertEmptyValues: false,
      removeUndefinedValues: true,
    },
  });

  const singleTable = new Table({
    name: props.tableName,
    documentClient,
    partitionKey: { name: 'pk', type: 'string' },
    sortKey: { name: 'sk', type: 'string' },
  });

  const PokemonEntity = createPokemonEntity(singleTable)
  const RequestLogEntity = createRequestLogEntity(singleTable)
  const RequestLogTotalEntity = createRequestLogTotalEntity(singleTable)

  return {
    entities: {
      Pokemon: PokemonEntity,
      RequestLog: RequestLogEntity,
      RequestLogTotal: RequestLogTotalEntity,
    },
    repositories: {
      pokemon: PokemonEntity.build(EntityRepository),
      requestLog: RequestLogEntity.build(EntityRepository),
      requestLogTotal: RequestLogTotalEntity.build(EntityRepository),
    },
    documentClient,
    tableName: props.tableName,
    table: singleTable,
  }
}