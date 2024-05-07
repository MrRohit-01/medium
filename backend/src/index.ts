import { Hono } from 'hono'
import user from './routes/user';
import * as dotenv from 'dotenv';
dotenv.config();

const app = new Hono()


app.route("/api/v1",user);