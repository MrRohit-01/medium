import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { Post, PostType, PutType } from '../zod/validateInput'

export const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: string
  }
}>()

blogRoutes.all("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'],
  }).$extends(withAccelerate());

  const bearerToken = c.req.header('authorization');
  const token = bearerToken?.startsWith("Bearer ") ? bearerToken.split(" ")[1] : null;

  if (!token) {
    return c.json({ msg: "Access denied: Missing token" }, 401);
  }

  try {
    const verifyResponse = await verify(token, c.env.JWT_SECRET);
    if (!verifyResponse) {
      return c.json({ msg: "Access denied: Invalid token" }, 403);
    }

    const user = await prisma.user.findUnique({
      where: { id: verifyResponse.id as string },
      select: { id: true },
    });

    if (!user) {
      return c.json({ msg: "User doesn't exist" }, 404);
    }

    c.set('userId', user.id);
    await next();
  } catch (error) {
    console.error("Authorization error:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoutes.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'],
  }).$extends(withAccelerate());

  try {
    const body = <PostType>await c.req.json();
    const { success } = Post.safeParse(body);
    if (!success) {
      return c.json({ msg: "Invalid schema" }, 400);
    }

    const userId = c.get('userId');
    const response = await prisma.post.create({
      data: {
        authorId: userId,
        title: body.title,
        context: body.context,
      },
      select: { id: true },
    });

    return c.json({ response });
  } catch (error) {
    console.error("Failed to create post:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoutes.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'],
  }).$extends(withAccelerate());

  try {
    const body = <PutType>await c.req.json();
    const userId = c.get('userId');

    const response = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        context: body.context,
      },
      select: { id: true, title: true },
    });

    return c.json({ response });
  } catch (error) {
    console.error("Failed to update post:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoutes.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'],
  }).$extends(withAccelerate());

  try {
    const response = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        context: true,
        author: { select: { name: true } },
      },
    });

    return c.json(response);
  } catch (error) {
    console.error("Failed to fetch bulk posts:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoutes.get('/delete/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'],
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  const userId = c.get('userId');

  if (!id) {
    return c.json({ msg: 'Post ID is required' }, 400);
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!post) {
      return c.json({ msg: 'Post not found' }, 404);
    }

    if (post.authorId !== userId) {
      return c.json({ msg: 'Unauthorized to delete this post' }, 403);
    }

    await prisma.post.delete({ where: { id } });
    return c.json({ msg: 'Post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return c.json({ msg: 'Internal Server Error' }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoutes.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'],
  }).$extends(withAccelerate());

  const id = c.req.param('id');

  try {
    const responseData = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        context: true,
        author: { select: { name: true } },
      },
    });

    return c.json(responseData);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

blogRoutes.get('/me/posts', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn', 'error'],
  }).$extends(withAccelerate());

  const userId = c.get('userId');

  try {
    const response = await prisma.post.findMany({
      where: { authorId: userId },
      select: {
        id: true,
        title: true,
        context: true,
        author: { select: { name: true } },
      },
    });

    return c.json(response);
  } catch (error) {
    console.error("Failed to fetch user posts:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

