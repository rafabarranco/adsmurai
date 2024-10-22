export type TRequest = 'get' | 'post' | 'put';

export interface IUseApiResult {
  get<T>(endpoint: string): Promise<T>;
  post<T, Z>(endpoint: string, body: Z): Promise<T>;
  put<T, Z>(endpoint: string, body: Z): Promise<T>;
}
