'use client';

import { Fragment, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BlogDto, addBlog } from '@/app/api-service/blog.service';
import Form from '@/app/component/form.component';

const AddBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading('Sending Request 🚀', { id: '1' });
      const addBlogDto: BlogDto = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      };
      await addBlog(addBlogDto);
      toast.success('Blog Posted Successfully', { id: '1' });
      router.push('/');
    }
  };

  return (
    <Fragment>
      <Toaster />
      <Form
        title="Add A Wonderful Blog 🚀"
        handleSubmit={handleSubmit}
        titleRef={titleRef}
        descriptionRef={descriptionRef}
      />
    </Fragment>
  );
};

export default AddBlog;
