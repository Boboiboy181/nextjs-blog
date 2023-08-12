'use client';

import { Blog } from '@/types/blog.type';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

async function fetchBlogs() {
  const res = await fetch('http://localhost:3000/api/blogs', {
    next: {
      revalidate: 5,
    },
  });
  const data = await res.json();
  return data.posts;
}

const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blogs/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
  return (await res).json();
};

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([] as Blog[]);

  useEffect(() => {
    fetchBlogs().then((data) => {
      setBlogs(data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    toast.loading('Deleting Blog', { id: '2' });
    await deleteBlog(id);
    fetchBlogs().then((data) => {
      setBlogs(data);
    });
    toast.success('Blog Deleted', { id: '2' });
  };

  return (
    <Fragment>
      <Toaster />
      <main className={'w-full h-full'}>
        <div className={'md:w-2/4 sm:w-3/4 m-auto p-4 my-4'}>
          <h1 className={'text-slate-200 text-center text-5xl font-bold'}>
            Next.Js Blog App 🚀🎯
          </h1>
        </div>
        <div className={'flex mb-2'}>
          <Link
            href={'/blog/add'}
            className={
              'md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold text-lg'
            }
          >
            Add new blog 👨‍💻
          </Link>
        </div>
        <div className={'w-full flex flex-col justify-center items-center'}>
          {blogs.map((blog: Blog) => {
            return (
              <div
                key={blog.id}
                className={
                  'w-1/2 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center'
                }
              >
                <div className={'flex items-center my-3'}>
                  <div className={'mr-auto'}>
                    <h2 className={'mr-auto text-2xl font-semibold'}>
                      {blog.title}
                    </h2>
                  </div>
                  <Link
                    href={`/blog/edit/${blog.id}`}
                    className={
                      'px-4 py-1  text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200'
                    }
                  >
                    Edit
                  </Link>
                </div>
                <div className={'flex items-center justify-between'}>
                  <div>
                    <div className={'mr-auto my-1'}>
                      <blockquote className={'font-bold text-slate-700'}>
                        {new Date(blog.date).toDateString()}
                      </blockquote>
                    </div>
                    <div className={'mr-auto my-1'}>
                      <h2>{blog.description}</h2>
                    </div>
                  </div>
                  <button
                    className={
                      'px-4 py-1 text-center text-xl bg-red-600 rounded-md font-semibold text-slate-200'
                    }
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
