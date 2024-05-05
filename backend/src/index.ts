import { Hono } from 'hono'

const app = new Hono()

import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate())

app.post("/api/v1/user/signup",(c) => {
  return c.text("signup routes")
}) 
app.post("/api/v1/user/signin",(c) => {
  return c.text("signin routes")
}) 
app.post("/api/v1/blog",(c) => {
  return c.text("post blog routes")
}) 
app.put("/api/v1/blog",(c) => {
  return c.text("blog update routes")
}) 
app.get("/api/v1/blog/:id",(c) => {
  const id = c.req.param('id')
  console.log(id)
  return c.text("get blog by id routes")
}) 
app.get("/api/v1/blog/bulk",(c) => {
  return c.text("all blogroutes")
}) 
