import { Hono } from 'hono'

const user = new Hono()

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate())

user.post(" /user/signup", (c) => {
  return c.text("signup routes")
})
user.post(" /user/signin", (c) => {
  return c.text("signin routes")
})
user.post(" /blog", (c) => {
  return c.text("post blog routes")
})
user.put(" /blog", (c) => {
  return c.text("blog update routes")
})
user.get(" /blog/:id", (c) => {
  const id = c.req.param('id')
  console.log(id)
  return c.text("get blog by id routes")
})
user.get(" blog/bulk", (c) => {
  return c.text("all blogroutes")
}) 
export default user;