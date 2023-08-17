import { Blog } from '@/types/blog.type';
import Link from 'next/link';

type BlogItemProps = {
  blog: Blog;
  handleDelete: (id: string) => void;
};

const BlogItem = ({ blog, handleDelete }: BlogItemProps) => {
  return (
    <div
      key={blog.id}
      className={
        'xs:w-4/5 md:w-1/2 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center'
      }
    >
      <div className={'flex items-center my-3'}>
        <h2
          className={
            'mr-auto text-2xl font-semibold hover:text-slate-500 cursor-pointer'
          }
        >
          <Link href={`/blog/detail/${blog.id}`}>{blog.title}</Link>
        </h2>
        <Link
          href={`/blog/edit/${blog.id}`}
          className={
            'px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200'
          }
        >
          Edit
        </Link>
      </div>
      <div className={'flex items-center justify-between'}>
        <div className="flex-1">
          <div className={'mr-auto my-1'}>
            <blockquote className={'font-bold text-slate-700'}>
              {new Date(blog.date).toDateString()}
            </blockquote>
          </div>
          <div className={'mr-auto my-1 line-clamp-1 w-full'}>
            <p className="w-[90%]">{blog.description}</p>
          </div>
        </div>
        <button
          className={
            'px-4 py-1 text-center text-xl bg-red-600 rounded-md font-semibold text-slate-200'
          }
          onClick={() => handleDelete(blog.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogItem;
