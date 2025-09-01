import { Logger } from "../logger.interface";

export class ConsoleLogger implements Logger {
  log(message: string, context?: any) {
    console.log(`[LOG] ${message}`, context);
  }

  error(message: string, context?: any) {
    console.error(`[ERROR] ${message}`, context);
  }

  warn(message: string, context?: any) {
    console.warn(`[WARN] ${message}`, context);
  }

  info(message: string, context?: any) {
    console.info(`[INFO] ${message}`, context);
  }
}