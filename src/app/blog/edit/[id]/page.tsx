'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Blog } from '@/types/blog.type';

type UpdateBlogParams = {
  title: string;
  description: string;
  id: string;
};

type EditBlogParams = {
  params: {
    id: string;
  };
};

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://nextjs-blog-omega-ten-66.vercel.app'
    : 'http://localhost:3000';

const updateBlog = async (data: UpdateBlogParams): Promise<Blog> => {
  const res = fetch(`${url}/api/blogs/${data.id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ title: data.title, description: data.description }),
  });
  return (await res).json();
};

const getBlogById = async (id: string): Promise<Blog> => {
  const res = await fetch(`${url}/api/blogs/${id}`);
  const data = await res.json();
  return data.post;
};

const EditBlog = ({ params }: EditBlogParams) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    toast.loading('Fetching Blog Details 🚀', { id: '1' });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success('Fetching Complete', { id: '1' });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error fetching blog', { id: '1' });
      });
  }, [params.id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading('Sending Request 🚀', { id: '1' });
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
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
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit A Wonderful Blog 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 "
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <div className="flex justify-between">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100 w-full">
                Update
              </button>
            </div>
          </form>
          <button
            onClick={handleBackBtn}
            className="font-semibold text-slate-200 mt-3 px-4 py-2 shadow-xl bg-red-500 rounded-lg m-auto hover:bg-red-400 w-full"
          >
            Back
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBlog;
