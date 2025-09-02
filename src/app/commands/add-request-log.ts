import { SingleTableInstance } from "../../packages/dynamodb";
import { randomUUID } from "node:crypto";

type AddRequestLogCommand = {
  ip: string;
  method: string;
  path: string;
  response: Object;
  status: number;
}

export const addRequestLogCommand = async (ctx: {
  db: SingleTableInstance
}, log: AddRequestLogCommand) => {
  const now = new Date().toISOString()
  const id = randomUUID()
  await ctx.db.repositories.requestLog.put({
    pk: 'REQUEST_LOG',
    sk: `TS#${now}#${id}`,
    ip: log.ip,
    method: log.method,
    path: log.path,
    response: log.response,
    createdAt: now,
  })

  const { Item: requestTotalLog } = await ctx.db.repositories.requestLogTotal.get({ pk: 'REQUEST_LOG', sk: 'REQUEST_LOG#TOTAL' })

  if (!requestTotalLog) {
    await ctx.db.repositories.requestLogTotal.put({ pk: 'REQUEST_LOG', sk: 'REQUEST_LOG#TOTAL', count: 1 })
  } else {
    await ctx.db.repositories.requestLogTotal.put({ pk: 'REQUEST_LOG', sk: 'REQUEST_LOG#TOTAL', count: Number(requestTotalLog.count) + 1 })
  }

  return { id, createdAt: now }
}
