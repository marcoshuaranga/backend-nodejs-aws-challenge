export interface Logger {
  log: (message: string, context?: any) => void;
  error: (message: string, context?: any) => void;
  warn: (message: string, context?: any) => void;
  info: (message: string, context?: any) => void;
}