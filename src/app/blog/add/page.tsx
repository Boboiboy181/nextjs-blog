'use client';

import React, { Fragment, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BlogDto, addBlog } from '@/app/api-service/blog.service';
import Form from '@/app/component/form.component';

const defaultFormValues = {
  title: '',
  description: '',
};

const AddBlog = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setFormValues({ ...formValues, [event.target.name]: value });
  };

  const handleSubmit = async () => {
    if (formValues.title && formValues.description) {
      toast.loading('Sending Request 🚀', { id: '1' });
      const addBlogDto: BlogDto = {
        title: formValues.title,
        description: formValues.description,
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
        handleChange={handleChange}
        titleValue={formValues.title}
        descriptionValue={formValues.description}
      />
    </Fragment>
  );
};

export default AddBlog;
