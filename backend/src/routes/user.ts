import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify } from 'hono/jwt'
import {SignupType,Signin,SigninType, Signup} from "@rohitnpmdata/common-data-app"

export const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL:string,
    JWT_SECRET: string,
  },
  Variables:{
    userId:string
  }
}>()

userRoutes.use("/me/*",async(c,next)=>{
  const tokenWithPrefix = c.req.header("authorization")
  const token = tokenWithPrefix?.split(" ")[1]

  if(!tokenWithPrefix || !token){
    return c.json({msg:"error on token"})
  }
  const response = await verify(token,c.env.JWT_SECRET)
  c.set("userId", response.id as string);
  await next()
})

userRoutes.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())

    const body =<SignupType> await c.req.json();
    const {success} = Signup.safeParse(body)
    if(!success){
      return c.json({msg:"invalid schema"})
    }
    const response = await prisma.user.create({
      data: {
        email: body.email,
        name:body.name,
        password: body.password,
      }
    })
    const token = await sign({ id: response.id }, c.env.JWT_SECRET)
    return c.json({ jwt: token });
  
})


userRoutes.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate())

  const body =<SigninType> await c.req.json();
  const {success} = Signin.safeParse(body)
  if(!success){
    return c.json({msg:"invalid schema"})
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  })
  if (!user) {
    return c.json({msg: 'invalid credentials'}, 401);
  }
  const token = await sign({ id:user.id}, c.env.JWT_SECRET)
  return c.json({ jwt: token });

})


userRoutes.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    const responseData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!responseData) {
      return c.json({ msg: "User not found" }, 404);
    }

    return c.json(responseData);
  } catch (error) {
    return c.json({ msg: "Failed to fetch user data" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

userRoutes.get('/profile', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return c.json({ msg: "User not found" }, 404);
    }

    return c.json(user);
  } catch (error) {
    return c.json({error}, 500);
  } finally {
    await prisma.$disconnect();
  }
});

userRoutes.put('/profile', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    const body = await c.req.json();
    const updateData: { name?: string; email?: string; password?: string } = {
      name: body.name,
      email: body.email,
    };

    if (body.password) {
      updateData.password = body.password;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true },
    });

    return c.json(updatedUser);
  } catch (error) {
    return c.json({ msg: "Failed to update profile" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});