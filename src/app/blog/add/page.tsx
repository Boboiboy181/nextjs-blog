'use client';

import { Fragment, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Blog } from '@/types/blog.type';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://nextjs-blog-omega-ten-66.vercel.app'
    : 'http://localhost:3000';

const postBlog = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<Blog> => {
  const res = fetch(`${url}/api/blogs`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ title, description }),
  });
  return (await res).json();
};

const AddBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading('Sending Request 🚀', { id: '1' });
      await postBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      });
      toast.success('Blog Posted Successfully', { id: '1' });
      router.push('/');
    }
  };

  const handleBackBtn = () => {
    router.push('/');
  };

  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="xs:text-3xl md:text-5xl text-slate-200 font-bold p-3">
            Add A Wonderful Blog 🚀
          </p>
          <form
            onSubmit={handleSubmit}
            className={'xs:text-center md:text-left'}
          >
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 xs:w-4/5 md:w-full py-2 my-2 "
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 xs:w-4/5 md:w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100 xs:w-4/5 md:w-full">
              Submit
            </button>
          </form>
          <button
            onClick={handleBackBtn}
            className="font-semibold text-slate-200 mt-3 px-4 py-2 shadow-xl bg-red-500 rounded-lg m-auto hover:bg-red-400 xs:w-4/5 md:w-full"
          >
            Back
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddBlog;
