import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRoutes from './routes/authRoutes'
import propertyRoutes from './routes/propertyRoutes'
import bookingRoute from './routes/booking'
import ratingRoute from './routes/raiting'

import { logger } from 'hono/logger'


const app = new Hono()

app.use("*", cors());


app.use("*", logger())

app.route("/api/v1/auth", authRoutes);
app.route("/api/v1/property", propertyRoutes);
app.route("/api/v1/booking", bookingRoute)
app.route("/api/v1/rating", ratingRoute);


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
