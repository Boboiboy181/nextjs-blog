import { NextResponse } from 'next/server';
import prisma from '@/prisma';
import { Post } from '@/types/post.type';

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error('Database connection error');
  }
}

export const GET = async (request: Request, response: NextResponse) => {
  try {
    await main();
    const posts: Post[] = await prisma.post.findMany();
    return NextResponse.json({ message: 'Success', posts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (request: Request, response: NextResponse) => {
  try {
    const { title, description } = await request.json();
    await main();
    const post: Post = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ message: 'Success', post }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Failed to create a post', error },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
};
