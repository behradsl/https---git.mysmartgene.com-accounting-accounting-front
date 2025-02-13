import useSWR from 'swr';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true, 
});


const fetcher = async (url: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', data?: any) => {
  const res = await api.request({ url, method, data });
  return res.data;
};

export function useAuth() {
  
  const { data: user, error, mutate } = useSWR(`${backendUrl}/auth/user`, fetcher);

  const login = async (email: string, password: string) => {
    try {
      await fetcher('/auth/user/signin', 'post', { email, password });
      mutate(); 
    } catch (err) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = async () => {
    await fetcher('/auth/user/signout', 'post');
    mutate(null);
  };

  return { user, error, login, logout, isLoading: !user && !error };
}
