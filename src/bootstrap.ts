import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { createMoviedbFetch } from "./packages/apis/moviedb";
import { loggerPlugin } from "./packages/apis/plugins/logger.plugin";
import { createSwapiFetch } from "./packages/apis/swapi";
import { createConfig } from "./packages/config";
import { createSingleTable } from "./packages/dynamodb";
import { createKeyv } from "./packages/keyv";
import { createLogger } from "./packages/logger";
import { EnvironmentVariables } from "./env";

export function bootstrap(env: EnvironmentVariables) {
  const config = createConfig({
    cacheTableName: env.DYNAMODB_CACHE_TABLE_NAME,
    singleTableName: env.DYNAMODB_SINGLE_TABLE_NAME,
    swapiUrl: 'https://swapi.py4e.com/api',
    moviedbUrl: 'https://api.themoviedb.org/3',
    moviedbApiToken: env.MOVIEDB_API_TOKEN,
  });
  const logger = createLogger('default')

  return {
    swapi: createSwapiFetch({
      baseURL: config.swapiUrl,
      timeout: 5000,
      plugins: [loggerPlugin('SWAPI', logger)]
    }),
    moviedb: createMoviedbFetch({
      token: config.moviedbApiToken,
      baseURL: config.moviedbUrl,
      timeout: 5000,
      plugins: [loggerPlugin('MOVIEDB', logger)]
    }),
    keyv: createKeyv({
      dynamoOptions: {
        tableName: config.cacheTableName,
      },
      logger: logger,
      namespace: 'keyv',
      ttl: 3600,
    }),
    singleTable: createSingleTable({
      dynamoDBClient: new DynamoDBClient(),
      tableName: config.singleTableName,
    })
  }
}
