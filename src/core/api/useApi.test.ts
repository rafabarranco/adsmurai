import { renderHook } from '@testing-library/react';
import axios from 'axios';
import useApi from './useApi';
import { describe, it, expect, vi, beforeEach, Mocked } from 'vitest';

vi.mock('axios');

describe('useApi', () => {
  const mockAxios = axios as Mocked<typeof axios>;
  const mockedEndpoint = 'http://localhost:3000/api/test-endpoint';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should perform a GET request successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useApi());
    const data = await result.current.get('test-endpoint');

    expect(data).toEqual(mockData);
    expect(mockAxios.get).toHaveBeenCalledWith(mockedEndpoint);
  });

  it('should perform a POST request successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    const requestBody = { name: 'Test' };
    mockAxios.post.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useApi());

    const data = await result.current.post('test-endpoint', requestBody);

    expect(data).toEqual(mockData);
    expect(mockAxios.post).toHaveBeenCalledWith(mockedEndpoint, requestBody);
  });

  it('should perform a PUT request successfully', async () => {
    const mockData = { id: 1, name: 'Updated Test' };
    const requestBody = { name: 'Updated Test' };
    mockAxios.put.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useApi());

    const data = await result.current.put('test-endpoint', requestBody);

    expect(data).toEqual(mockData);
    expect(mockAxios.put).toHaveBeenCalledWith(mockedEndpoint, requestBody);
  });

  it('should throw an error on GET request failure', async () => {
    const errorMessage = 'Network Error';
    mockAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useApi());

    await expect(result.current.get('test-endpoint')).rejects.toThrow(
      'Network Error',
    );
    expect(mockAxios.get).toHaveBeenCalledWith(mockedEndpoint);
  });

  it('should throw an error on POST request failure', async () => {
    const errorMessage = 'Network Error';
    mockAxios.post.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useApi());

    await expect(result.current.post('test-endpoint', {})).rejects.toThrow(
      'Network Error',
    );
    expect(mockAxios.post).toHaveBeenCalledWith(mockedEndpoint, {});
  });

  it('should throw an error on PUT request failure', async () => {
    const errorMessage = 'Network Error';
    mockAxios.put.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useApi());

    await expect(result.current.put('test-endpoint', {})).rejects.toThrow(
      'Network Error',
    );
    expect(mockAxios.put).toHaveBeenCalledWith(mockedEndpoint, {});
  });
});
