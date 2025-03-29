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
  console.log(response)
  await next()
})

userRoutes.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parseResult = Signup.safeParse(body);

  if (!parseResult.success) {
    return c.json({ msg: "Invalid schema", errors: parseResult.error.errors }, 400);
  }

  try {
    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: parseResult.data.email },
    });

    if (existingUser) {
      return c.json({ error: 'Email already in use' }, 400);
    }

    // Create a new user
    const response = await prisma.user.create({
      data: {
        email: parseResult.data.email,
        name: parseResult.data.name,
        password: parseResult.data.password,
      },
    });

    const token = await sign({ id: response.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return c.json({ error: 'Unique constraint failed on the email field' }, 400);
    } else {
      return c.json({ error: 'Internal Server Error' }, 500);
    }
  } finally {
    await prisma.$disconnect();
  }
});

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

userRoutes.get('/me/profile', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json(
        { msg: "Authorization failed: Missing or invalid user token. Please log in again." },
        400
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return c.json({ msg: "User not found" }, 404);
    }

    return c.json(user);
  } catch (error) {
    return c.json({ msg: "Failed to fetch profile", error }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

userRoutes.put('/me/profile', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json(
        { msg: "Authorization failed: Missing or invalid user token. Please log in again." },
        400
      );
    }

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

userRoutes.post('/logout', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'], // Add logging
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json({ msg: "Authorization failed: Missing or invalid user token." }, 400);
    }

    // Invalidate all tokens for the user (e.g., by updating a token version or blacklist)
    await prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } }, // Example: Increment token version
    });

    return c.json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error("Failed to logout user:", error);
    return c.json({ msg: "Failed to logout user" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});