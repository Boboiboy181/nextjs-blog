import { Blog } from '@/types/blog.type';
import BlogItem from './blog-item.component';

type BlogListProps = {
  blogs: Blog[];
  handleDelete: (id: string) => void;
};

const BlogList = ({ blogs, handleDelete }: BlogListProps) => {
  return (
    <div className={'w-full flex flex-col justify-center items-center'}>
      {blogs?.map((blog: Blog) => (
        <BlogItem key={blog.id} blog={blog} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default BlogList;
