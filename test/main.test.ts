import { expect, test, beforeAll } from 'vitest'
import { hono } from "../src/main"

test('GET /fusionados?filmId=3', async () => {
  const res = await hono.request('/fusionados?filmId=3')
  expect(res.status).toBe(200)
})

test('POST /almacenar', async () => {
  const res = await hono.request('/almacenar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pokemon: {
        name: 'Pikachu',
        type: 'electric',
        level: 35,
      }
    }),
  })

  expect(res.status).toBe(200)
})

test('GET /historial?page=1&limit=10', async () => {
  const res = await hono.request('/historial?page=1&limit=10')

  expect(res.status).toBe(200)
})