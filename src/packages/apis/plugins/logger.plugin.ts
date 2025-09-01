import { BetterFetchPlugin } from "@better-fetch/fetch";
import { Logger } from "../../logger";

export const loggerPlugin = (prefix: string, logger: Logger) => {
  return {
    id: 'logger',
    name: 'Logger Plugin',
    description: 'Logs requests and responses',
    hooks: {
      onRequest: (requestContext) => {
        logger.log(`[${prefix}] Request -> ${requestContext.method} ${requestContext.url}`);
      },
      onResponse: (responseContext) => {
        const { request, response } = responseContext;

        logger.log(`[${prefix}] Response -> ${request.method} ${request.url} - ${response.status}`);
      },
      onError: (errorContext) => {
        const { error, request, response } = errorContext;

        logger.error(`[${prefix}] Error -> ${request.method} ${request.url} - ${error.message}`, { response });
      },
    },
  } satisfies BetterFetchPlugin
}
