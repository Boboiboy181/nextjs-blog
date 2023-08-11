import { Blog } from '@/types/blog.type';
import api from '@/axios-api/axios.config';

export const getAllBlogs = async (): Promise<Blog[]> => {
  const { data } = await api.get('/blogs');
  return data;
};
