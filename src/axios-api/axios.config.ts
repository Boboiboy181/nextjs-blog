import axios from 'axios';

const URL = {
  LOCALHOST: 'http://localhost:3000/api',
};

const BASE_URL = URL.LOCALHOST;

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Credentials': true,
  },
});

export default api;
