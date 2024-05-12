import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
export const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()
userRoutes.post('/user/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const response = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    }
  })
  const token = await sign({ id: response.id }, c.env.JWT_SECRET)
  return c.json({ jwt: token });

})


userRoutes.post('/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const user = await prisma.user.findUnique({

    where: {
      email: body.email
    }
  })
  if (!user) {
    return c.text('error, user ' + body.email + ' doesn\'t exist,sign up first')
  }
  const token = await sign({ email: body.email }, c.env.JWT_SECRET)
  return c.json({ jwt: token });

})


userRoutes.post('/blog', (c) => {
  return c.text('post blog routes')
})


userRoutes.put('/blog', (c) => {
  return c.text('blog update routes')
})


userRoutes.get('/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id)
  return c.text('get blog by id routes')
})


userRoutes.get('/blog/bulk', (c) => {
  return c.text('all blogroutes')
})