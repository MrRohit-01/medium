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

blogRoutes.all("/*",async (c,next)=>{=> {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate());

  const bearerToken = c.req.header('authorization');
  const token = bearerToken?.startsWith("Bearer ") ? bearerToken.split(" ")[1] : null;

  if (!token) {
    return c.json({ msg: "Access denied: Missing token" }, 401); // Return a 401 error for missing tokens
  }

  try {
    const verifyResponse = await verify(token, c.env.JWT_SECRET);
    if (!verifyResponse) {
      return c.json({ msg: "Access denied: Invalid token" }, 403); // Return a 403 error for invalid tokens
    }

    const user = await prisma.user.findUnique({
      where: {
        id: verifyResponse.id as string,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return c.json({ msg: "User doesn't exist" }, 404); // Return a 404 error if the user doesn't exist
    }

    c.set('userId', user.id);
    await next();
  } catch (error) {
    console.error("Authorization error:", error);
    return c.json({ msg: "Internal Server Error" }, 500); // Return a 500 error for unexpected issues
  } finally {
    await prisma.$disconnect();
  }
});

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
        title:body.title,{
        context:body.context  const prisma = new PrismaClient({
      },RL,
      select:{ror'], // Add logging
        id:true,
        title:true
      }
    })sponse = await prisma.post.findMany({
 return c.json({response}){
})
,
t: true,
blogRoutes.get('/bulk',async (c) => {{

  const prisma = new PrismaClient({   name: true,
    datasourceUrl: c.env.DATABASE_URL,   },
    log: ['query', 'info', 'warn', 'error'], // Add logging        },
  }).$extends(withAccelerate()) },
  const response = await prisma.post.findMany({});
    select:{
      id:true,  return c.json(response);
      title:true,
      context:true,bulk posts:", error); // Log the error
      author:{ver Error" }, 500);
        select:{
          name:true
        }  }
      }

    }blogRoutes.get('/delete/:id', async (c) => {
  })ma = new PrismaClient({
  return c.json(response)
}) log: ['query', 'info', 'warn', 'error'], // Add logging
blogRoutes.get('/delete/:id', async (c) => {  }).$extends(withAccelerate());
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate());

  const id = c.req.param('id');urn c.json({ msg: 'Post ID is required' }, 400);
  const userId = c.get('userId');  }

  if (!id) {
    return c.json({ msg: 'Post ID is required' }, 400);/ Check if the post exists and belongs to the user
  }    const post = await prisma.post.findUnique({

  try {
    // Check if the post exists and belongs to the user);
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true },st not found' }, 404);
    });

    if (!post) {    if (post.authorId !== userId) {
      return c.json({ msg: 'Post not found' }, 404);post' }, 403);
    }

    if (post.authorId !== userId) {
      return c.json({ msg: 'Unauthorized to delete this post' }, 403); await prisma.post.delete({
    }   where: { id },

    // Delete the post
    await prisma.post.delete({ted successfully' });
      where: { id },
    });
ed post'},200);
    return c.json({ msg: 'Post deleted successfully' });  }
  } catch (error) {
    console.error('Failed to delete post:', error);
    return c.json({ msg: 'deleted post'},200);
  }ma = new PrismaClient({
});tasourceUrl: c.env.DATABASE_URL,
blogRoutes.get('/:id',async (c) => {uery', 'info', 'warn', 'error'], // Add logging
withAccelerate())
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,param('id')
    log: ['query', 'info', 'warn', 'error'], // Add loggingseData = await prisma.post.findUnique({
  }).$extends(withAccelerate())

  const id = c.req.param('id')
  const responseData = await prisma.post.findUnique({ect:{
    where:{ id:true,
      id:id,  title:true,
    },
    select:{    author:{
      id:true,        select:{
      title:true,
      context:true,
      author:{
        select:{
          name:true
        }  return c.json(responseData)
      }
    }
  })et('/me/posts', async (c) => {
  return c.json(responseData)ismaClient({
})tasourceUrl: c.env.DATABASE_URL,
ery', 'info', 'warn', 'error'], // Add logging
blogRoutes.get('/me/posts', async (c) => {ithAccelerate())
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,et('userId')
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())se = await prisma.post.findMany({

  const userId = c.get('userId')uthorId: userId,
  const response = await prisma.post.findMany({,
    where: {select: {
      authorId: userId,    id: true,
    },
    select: {      context: true,
      id: true,        author:{
      title: true,          select:{












})  return c.json(response)  })    },      }        }          name:true        select:{      author:{      context: true,            name:true
          }
        }
      },
    });
    return c.json(response);
  } catch (error) {
    console.error("Failed to fetch user posts:", error); // Log the error
    return c.json({ msg: "Internal Server Error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

