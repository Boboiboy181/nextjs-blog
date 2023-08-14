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
import Form from '@/app/component/form.component';

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
      <Form
        title="Edit A Wonderful Blog 🚀"
        handleSubmit={handleSubmit}
        titleRef={titleRef}
        descriptionRef={descriptionRef}
        handleBackBtn={handleBackBtn}
      />
    </Fragment>
  );
};

export default EditBlog;
