import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TRequest, UseApiResult } from './types';

const baseURL = 'http://localhost:3000/api/';

const instance = axios.create({
  baseURL,
  timeout: 1000,
});

const useApi = (): UseApiResult => {
  const request = async <T, Z = unknown>(
    method: TRequest,
    endpoint: string,
    body?: Z,
  ): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await instance[method](
        endpoint,
        body as AxiosRequestConfig,
      );
      return response.data;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message || 'Unexpected error');
    }
  };

  const get = async <T,>(endpoint: string): Promise<T> => {
    return request<T>('get', endpoint);
  };

  const post = async <T, Z>(endpoint: string, body: Z): Promise<T> => {
    return request<T, Z>('post', endpoint, body);
  };

  const put = async <T, Z>(endpoint: string, body: Z): Promise<T> => {
    return request<T, Z>('put', endpoint, body);
  };

  return { get, post, put };
};

export default useApi;
