'use client';

import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
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

const defaultFormValues = {
  title: '',
  description: '',
};

const EditBlog = ({ params }: EditBlogParams) => {
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
      setFormValues({
        title: data.post.title,
        description: data.post.description,
      });
      toast.success('Blog Loaded Successfully', { id: '1' });
    }
  }, [data]);

  const handleSubmit = async () => {
    if (formValues.title && formValues.description) {
      toast.loading('Sending Request 🚀', { id: '1' });
      const updateBlogDto: BlogDto = {
        title: formValues.title,
        description: formValues.description,
      };
      await updateBlog(params.id, updateBlogDto);
      toast.success('Blog Posted Successfully', { id: '1' });
      router.push('/');
    }
  };

  return (
    <Fragment>
      <Toaster />
      <Form
        title="Edit A Wonderful Blog 🚀"
        titleValue={formValues.title}
        descriptionValue={formValues.description}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Fragment>
  );
};

export default EditBlog;
