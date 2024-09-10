import axios from 'axios';

const headers = new axios.AxiosHeaders();
headers.set('Content-Type', 'application/json');

const createInstance = () => {
  const token = localStorage.getItem('token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST,
    headers
  });
}

export default axios;
export const instance = createInstance;