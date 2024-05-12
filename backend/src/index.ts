import { Hono } from 'hono';
import { userRoutes } from './routes/user';
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()



app.route("/api/v1",userRoutes)

export default app;
