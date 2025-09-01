import { ConsoleLogger } from './adapter/console.logger';
import { Logger } from './logger.interface';

export const createLogger = (logger: 'default' | Logger) => {
  if (logger === 'default') {
    return new ConsoleLogger();
  }
  return logger;
}

export type { Logger }