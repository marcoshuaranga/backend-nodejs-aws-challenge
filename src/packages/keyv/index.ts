import Keyv, { KeyvHooks } from 'keyv';
import KeyvDynamo, { KeyvDynamoOptions } from '@keyv/dynamo';
import { Logger } from '../logger';

export type KeyvInstance = ReturnType<typeof createKeyv>;

export const createKeyv = (props: {
  dynamoOptions?: KeyvDynamoOptions,
  logger?: Logger | false;
  namespace?: string;
  ttl?: number;
}) => {
  const logger = props.logger;
  const keyv = new Keyv<string>({
    store: props.dynamoOptions ? new KeyvDynamo(props.dynamoOptions) : new Map(),
    namespace: props.namespace,
    ttl: props.ttl,
  });

  logger && keyv.on('error', (err: Error) => logger.error(`[KEYV] Connection Error`, err));
  logger && keyv.on('clear', () => logger.log(`[KEYV] Cache Cleared`));
  logger && keyv.on('disconnect', () => logger.warn(`[KEYV] Disconnected`));
  logger && keyv.hooks.addHandler(KeyvHooks.PRE_SET, ({ key }) => logger.log(`[KEYV] Setting key ${key}`));
  logger && keyv.hooks.addHandler(KeyvHooks.PRE_GET, ({ key }) => logger.log(`[KEYV] Getting key ${key}`));

  return keyv;
}
