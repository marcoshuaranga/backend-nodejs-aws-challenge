import { SingleTableInstance } from "../../packages/dynamodb";

export type RequestLogQuery = {
  page?: number;

  limit?: number;
}

export async function getRequestLogs(ctx: {
  db: SingleTableInstance
}, query: RequestLogQuery) {
  const { page, limit } = query;
  const take = Math.max(1, Number(limit ?? page ?? 10));

  const { Items } = await ctx.db.repositories.requestLog.query(
    { partition: 'REQUEST_LOG' },
    { limit: take, reverse: true, attributes: ['sk', 'ip', 'path', 'response', 'createdAt'] }
  )

  const items = (Items || []).map((it: any) => ({
    id: String(it.sk).split('#').pop() as string,
    ip: String(it.ip),
    path: String(it.path),
    response: (() => { try { return JSON.parse(it.response as string) } catch { return it.response } })(),
    createdAt: String(it.createdAt),
  }))

  return { items }
}