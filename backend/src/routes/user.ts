import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {SignupType,Signin,SigninType, Signup} from '../zod/validateInput'

export const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL:string,
    JWT_SECRET: string,
  }
}>()
userRoutes.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

    const body =<SignupType> await c.req.json();
    const {success} = Signup.safeParse(body)
    if(!success){
      return c.json({msg:"invalid schema"})
    }
    const response = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      }
    })
    const token = await sign({ id: response.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token });
  
})


userRoutes.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body =<SigninType> await c.req.json();
  const {success} = Signin.safeParse(body)
  if(!success){
    return c.json({msg:"invalid schema"})
  }
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


