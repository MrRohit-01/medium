import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {SignupType,Signin,SigninType,Post,PostType,PutType, Signup} from '../zod/validateInput'

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


userRoutes.post('/user/signin', async (c) => {
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


userRoutes.post('/blog',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const bearerToken = c.req.header('authorization')
  const body =<PostType> await c.req.json()
  const {success} = Post.safeParse(body)
  if(!success){
    return c.json({
      msg: "error schema"
    })
  }
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
        id:true,
        title:true,
        context:true
      }
    })
 return c.json({response})
})


userRoutes.put('/blog',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const bearerToken = c.req.header('authorization')
  const body =<PutType> await c.req.json()
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
    const response = await prisma.post.update({
      where:{
        id:body.id,
      },
      data:{
        title:body.title,
        context:body.context
      },
      select:{
        id:true,
        title:true
      }
    })
 return c.json({response})
})

userRoutes.get('/blog/bulk',async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const response = await prisma.post.findMany({
    select:{
      title:true,
      context:true
    }
  })
  return c.json({response})
})

userRoutes.get('/blog/:id',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const id = c.req.param('id')
  const response = await prisma.post.findUnique({
    where:{
      id:id,
    },
    select:{
      title:true,
      context:true
    }
  })
  return c.json({response})
})

