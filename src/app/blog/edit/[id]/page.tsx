'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import {
  BlogDto,
  getBlogByID,
  updateBlog,
} from '@/app/api-service/blog.service';

type EditBlogParams = {
  params: {
    id: string;
  };
};

const EditBlog = ({ params }: EditBlogParams) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const { data } = useSWR(params.id ? `${params.id}` : null, getBlogByID, {
    refreshInterval(latestData) {
      if (latestData !== data) {
        return 10;
      } else {
        return 0;
      }
    },
  });

  useEffect(() => {
    toast.loading('Loading Blog 🚀', { id: '1' });
    if (data && titleRef.current && descriptionRef.current) {
      titleRef.current.value = data.post.title;
      descriptionRef.current.value = data.post.description;
      toast.success('Blog Loaded Successfully', { id: '1' });
    }
  }, [data]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading('Sending Request 🚀', { id: '1' });
      const updateBlogDto: BlogDto = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      };
      await updateBlog(params.id, updateBlogDto);
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
            Edit A Wonderful Blog 🚀
          </p>
          <form onSubmit={handleSubmit} className={'text-center'}>
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
            <div
              className={
                'flex xs:flex-col sm:flex-row justify-between items-center'
              }
            >
              <button
                className={
                  'font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100 xs:w-4/5 md:w-full lg:w-fit lg:m-0'
                }
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleBackBtn}
                className={
                  'font-semibold text-slate-200 mt-3 px-4 py-2 shadow-xl bg-red-500 rounded-lg m-auto hover:bg-red-400 xs:w-4/5 md:w-full lg:w-fit lg:m-0'
                }
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditBlog;
