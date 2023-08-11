import { Blog } from '@/types/blog.type';

async function fetchBlogs() {
  const res = await fetch('http://localhost:3000/api/blogs', {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  return data.posts;
}

const Home = async () => {
  const blogs = await fetchBlogs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
      <div>
        {blogs.map((blog: Blog) => {
          return (
            <div key={blog.id} className={'p-4'}>
              <h2> Title: {blog.title}</h2>
              <p>Description: {blog.description}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
