import { Hono } from 'hono'
import user from './routes/user';


const app = new Hono()


app.route("/api/v1",user);