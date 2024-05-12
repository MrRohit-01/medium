import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
export const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL:string,
    JWT_SECRET: string,
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
    return c.text('error, user "' + body.email + '" doesn\'t exist,sign up first')
  }
  const token = await sign({ id:user.id}, c.env.JWT_SECRET)
  return c.json({ jwt: token });

})


userRoutes.post('/blog',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const bearerToken = c.req.header('authorization')
  const body = await c.req.json()
  const token = bearerToken?.split(" ")[1]
    if(!token){
      return c.text("access denied")
    
    }
    const verifyResponse =await verify(token,c.env.JWT_SECRET)
    const user = await prisma.user.findUnique({
     where:{
       id : verifyResponse.id,
     },
     select:{
       id:true
      }
    })
    if(!user){
      return c.text("user doesn't exist")
    }
    const response = await prisma.post.create({
      data:{
        authorId:user.id,
        title: body.title,
        context: body.context
      },
      select:{
        title:true,
        context:true
      }
    })
 return c.json({response})
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