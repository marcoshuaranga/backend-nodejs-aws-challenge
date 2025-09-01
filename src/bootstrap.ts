import { createMoviedbFetch } from "./packages/apis/moviedb";
import { loggerPlugin } from "./packages/apis/plugins/logger.plugin";
import { createSwapiFetch } from "./packages/apis/swapi";
import { createConfig } from "./packages/config";
import { createKeyv } from "./packages/keyv";
import { createLogger } from "./packages/logger";

export function bootstrap() {
  const config = createConfig({
    cacheTableName: process.env.DYNAMODB_CACHE_TABLE_NAME,
    singleTableName: process.env.DYNAMODB_SINGLE_TABLE_NAME,
    swapiUrl: 'https://swapi.py4e.com/api',
    moviedbUrl: 'https://api.themoviedb.org/3',
    moviedbApiToken: process.env.MOVIEDB_API_TOKEN,
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
    })
  }
}
