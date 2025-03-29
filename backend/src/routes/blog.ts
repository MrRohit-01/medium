import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import {Post,PostType,PutType} from '../zod/validateInput'


export const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL:string,
    JWT_SECRET: string,
  },
  Variables:{
    userId :string
  }
}>()

blogRoutes.all("/*",async (c,next)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())
  const bearerToken = c.req.header('authorization')
  const token = bearerToken?.startsWith("Bearer ") ? bearerToken.split(" ")[1] : null; // Ensure 'Bearer' prefix is handled
  if(!token){
    return c.text("access denied")
  }
    const verifyResponse =await verify(token,c.env.JWT_SECRET)
    if(!verifyResponse){
      return c.text("access denied")
    }

    const user = await prisma.user.findUnique({
      where:{
        id : verifyResponse.id as string,
      },
      select:{
        id:true
      }
    })
    if(!user){
      return c.text("user doesn't exist")
    }
    c.set('userId',user.id)
    await next()
})

blogRoutes.post('/',async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())

  const body =<PostType> await c.req.json()
  const {success} = Post.safeParse(body)
  if(!success){
    return c.json({
      msg: "error schema"
    })
  }
  const userId = c.get('userId')  
    const response = await prisma.post.create({
      data:{
        authorId:userId,
        title: body.title,
        context: body.context
      },
      select:{
        id:true,
      }
    })
 return c.json({response})
})


blogRoutes.put('/',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())

  const body =<PutType> await c.req.json()
  
  const userId = c.get('userId')

    const response = await prisma.post.update({
      where:{
        id:body.id,
        authorId:userId,
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


blogRoutes.get('/bulk',async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())
  const response = await prisma.post.findMany({
    select:{
      id:true,
      title:true,
      context:true,
      author:{
        select:{
          name:true
        }
      }

    }
  })
  return c.json(response)
})
blogRoutes.get('/delete/:id',async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())

  const id = c.req.param('id')
  const userId = c.get('userId')
  const response = await prisma.post.delete({
    where:{
      id:id,
     authorId:userId
    }
  })
})
blogRoutes.get('/:id',async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())

  const id = c.req.param('id')
  const responseData = await prisma.post.findUnique({
    where:{
      id:id,
    },
    select:{
      id:true,
      title:true,
      context:true,
      author:{
        select:{
          name:true
        }
      }
    }
  })
  return c.json(responseData)
})

blogRoutes.get('/me/posts', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())

  const userId = c.get('userId')
  const response = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      context: true,
    },
  })
  return c.json(response)
})

