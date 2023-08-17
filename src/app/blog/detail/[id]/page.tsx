'use client';

import { getBlogByID } from '@/app/api-service/blog.service';
import { Blog } from '@/types/blog.type';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import useSWR from 'swr';

type BlogDetailParams = {
  params: {
    id: string;
  };
};

const BlogDetail = ({ params }: BlogDetailParams) => {
  const { data } = useSWR(params.id ? `${params.id}` : null, getBlogByID, {
    refreshInterval(latestData) {
      if (latestData !== data) {
        return 10;
      } else {
        return 0;
      }
    },
    revalidateOnFocus: false,
  });

  useEffect(() => {
    toast.loading('Loading Blog 🚀', { id: '1' });
    if (data) {
      toast.success('Blog Loaded Successfully', { id: '1' });
    }
  }, [data]);

  const blog: Blog = data?.post;

  return (
    <Fragment>
      <Toaster />
      <div className={`h-screen relative`}>
        <Link
          href={'/'}
          className={`px-4 py-1 text-center text-xl border-slate-200 border rounded-md font-semibold text-slate-200
             hover:bg-slate-200 hover:text-slate-900 transition-all duration-300 ease-in-out absolute top-8 left-8`}
        >
          Back
        </Link>
        <div
          className={`text-slate-200 flex flex-col absolute top-[20%] left-[50%] 
          translate-x-[-50%] space-y-10 w-[80%]`}
        >
          {data && (
            <Fragment>
              <div className={'text-left'}>
                <h1 className={'text-5xl'}>{blog.title}</h1>
                <p className={'text-slate-400'}>
                  {new Date(blog.date).toDateString()}
                </p>
              </div>
              <ReactMarkdown className={'text-justify'}>{blog.description}</ReactMarkdown>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BlogDetail;
