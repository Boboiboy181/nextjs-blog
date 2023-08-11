import prisma from '@/prisma';
import { NextResponse } from 'next/server';
import { main } from '@/app/api/blog/route';
import { Post } from '@/types/post.type';

export const GET = async (request: Request, response: NextResponse) => {
  try {
    const id = request.url.split('/blog/')[1];
    await main();
    const post: Post | null = await prisma.post.findUnique({ where: { id } });
    if (!post)
      return NextResponse.json(
        { message: `Post with id ${id} not found` },
        { status: 404 },
      );
    return NextResponse.json({ message: 'Success', post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PATCH = async (request: Request, response: NextResponse) => {
  try {
    const id = request.url.split('/blog/')[1];
    const { title, description } = await request.json();
    await main();
    const post: Post | null = await prisma.post.update({
      where: { id },
      data: { title, description },
    });
    if (!post)
      return NextResponse.json(
        { message: `Post with id ${id} not found` },
        { status: 404 },
      );
    return NextResponse.json({ message: 'Success', post }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (request: Request, response: NextResponse) => {
  try {
    const id = request.url.split('/blog/')[1];
    await main();
    const post: Post | null = await prisma.post.delete({ where: { id } });
    return NextResponse.json(
      { message: 'Delete success', post },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
