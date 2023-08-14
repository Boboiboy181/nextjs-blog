'use client';

import { getBlogByID } from '@/app/api-service/blog.service';
import { Blog } from '@/types/blog.type';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
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
      <div>
        {/* <button>
          <Link href={'/'}>Back</Link>
        </button> */}
        <div
          className={
            'text-slate-200 flex items-center flex-col justify-center h-screen'
          }
        >
          {data && (
            <Fragment>
              <h1 className={'text-5xl'}>{blog.title}</h1>
              <p>{blog.description}</p>
              <p>{new Date(blog.date).toDateString()}</p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BlogDetail;
