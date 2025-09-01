import { KeyvInstance } from '../keyv';

/**
 * Functional cache wrapper for async functions using Keyv.
 * Usage:
 *   const cachedFetch = withCache({ key, ttl, fetchFn })(keyv);
 *   cachedFetch().then(...)
 */
export function withCache<Result>(
  options: {
    key: string;
    ttl?: number;
    fetchFn: () => Promise<Result>;
  }
) {
  return (keyv: KeyvInstance) => {
    return async (): Promise<Result> => {
      const { key, ttl, fetchFn } = options;
      const cached = await keyv.get(key);
      if (cached !== undefined) {
        return cached as Result;
      }
      const result = await fetchFn();
      await keyv.set(key, result, ttl ? ttl * 1000 : undefined);
      return result;
    };
  };
}