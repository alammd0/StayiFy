import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRoutes from './routes/authRoutes'
import propertyRoutes from './routes/propertyRoutes'

import { logger } from 'hono/logger'

const app = new Hono()

app.use(
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use("*", logger())

app.route("/api/v1/auth", authRoutes);
app.route("/api/v1/property", propertyRoutes);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
