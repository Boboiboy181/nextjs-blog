'use client';

import { Blog } from '@/types/blog.type';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import BackToTop from './component/back-to-top.component';
import useSWR from 'swr';
import { deleteBlog, getBlogs } from './api-service/blog.service';
import BlogList from './component/blog-list.component';
import Confirm from './component/confirm.component';

async function fetchBlogs() {
  const { data } = await getBlogs();
  return data.posts;
}

const Home = () => {
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

  const { data } = useSWR('/api/blogs', fetchBlogs, {
    refreshInterval(latestData) {
      if (latestData?.length !== blogs.length) {
        return 500;
      } else {
        return 0;
      }
    },
  });

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  };

  useEffect(() => {
    if (data) {
      setBlogs(data);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data]);

  const handleDelete = async (id: string) => {
    toast.loading('Deleting Blog', { id: '2' });
    await deleteBlog(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
    toast.success('Blog Deleted', { id: '2' });
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConfirm = (id: string) => {
    setIsOpen(true);
    setId(id);
  };

  return (
    <Fragment>
      <Toaster />
      <main className={'w-full h-full'}>
        <div className={'md:w-2/4 sm:w-3/4 m-auto p-4 my-4'}>
          <h1
            className={
              'text-slate-200 text-center xs:text-3xl md:text-5xl font-bold'
            }
          >
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
        <BlogList blogs={blogs} handleDelete={handleOpenConfirm} />
      </main>
      {isOpen && <Confirm idToDelete={id} setIsOpen={setIsOpen} handleDelete={handleDelete} />}
      <BackToTop showBtn={showBtn} backToTop={backToTop} />
    </Fragment>
  );
};

export default Home;
