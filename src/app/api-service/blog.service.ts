import { Blog } from '@/types/blog.type';
import api from './axios.config';

export type BlogDto = {
  title: string;
  description: string;
};

export const getBlogs = async () => {
  const data = await api.get('/api/blogs');
  return data;
};

export const addBlog = async (addBlogDto: BlogDto): Promise<Blog> => {
  const { data } = await api.post('/api/blogs', addBlogDto);
  return data;
};

export const getBlogByID = async (id: string) => {
  const { data } = await api.get(`/api/blogs/${id}`);
  return data;
};

export const updateBlog = async (
  id: string,
  updateBlogDto: BlogDto,
): Promise<Blog> => {
  const { data } = await api.patch(`/api/blogs/${id}`, updateBlogDto);
  return data;
};

export const deleteBlog = async (id: string): Promise<Blog> => {
  const { data } = await api.delete(`/api/blogs/${id}`);
  return data;
};
