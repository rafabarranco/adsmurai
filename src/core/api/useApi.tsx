import axios from 'axios';
import { useCallback } from 'react';

const baseURL = 'http://localhost:3000/api/';

const useApi = () => {
  const get = useCallback(async <T,>(endpoint: string): Promise<T> => {
    try {
      const response = await axios.get(`${baseURL}${endpoint}`);
      return response.data as T;
    } catch (error) {
      throw new Error((error as Error).message || 'Unexpected error');
    }
  }, []);

  const post = useCallback(
    async <T, Z>(endpoint: string, body: Z): Promise<T> => {
      try {
        const response = await axios.post(`${baseURL}${endpoint}`, body);
        return response.data as T;
      } catch (error) {
        throw new Error((error as Error).message || 'Unexpected error');
      }
    },
    [],
  );

  const put = useCallback(
    async <T, Z>(endpoint: string, body: Z): Promise<T> => {
      try {
        const response = await axios.put(`${baseURL}${endpoint}`, body);
        return response.data as T;
      } catch (error) {
        throw new Error((error as Error).message || 'Unexpected error');
      }
    },
    [],
  );

  return { get, post, put };
};

export default useApi;
