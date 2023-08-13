import axios from 'axios';

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://nextjs-blog-omega-ten-66.vercel.app'
    : 'http://localhost:3000';

const api = axios.create({
  withCredentials: true,
  baseURL: url,
  headers: {
    'Access-Control-Allow-Credentials': true,
  },
});

export default api;
