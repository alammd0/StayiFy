import { Hono } from 'hono'
import authRoutes from './routes/authRoutes'

import { logger } from 'hono/logger'

const app = new Hono()

app.use("*", logger())

app.route("/api/v1/auth", authRoutes);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
