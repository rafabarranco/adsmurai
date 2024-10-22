import { renderHook } from '@testing-library/react';
import useEmployees from './useEmployees';
import useApi from '../../core/api/useApi';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';

vi.mock('../../core/api/useApi', () => {
  return {
    __esModule: true,
    default: vi.fn(),
  };
});

describe('useEmployees', () => {
  const mockGet = vi.fn();
  const endpoint = 'employees';

  beforeEach(() => {
    (useApi as Mock).mockImplementation(() => ({
      get: mockGet,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch employees successfully', async () => {
    const mockEmployees = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        hireDate: '2023-01-01',
        salary: 50000,
        role: 'admin',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        hireDate: '2022-06-15',
        salary: 60000,
        role: 'user',
      },
    ];

    mockGet.mockResolvedValueOnce(mockEmployees);

    const { result } = renderHook(() => useEmployees());

    const employees = await result.current.getEmployees();

    expect(mockGet).toHaveBeenCalledWith(endpoint);
    expect(employees).toEqual(mockEmployees);
  });

  it('should throw an error if fetching employees fails', async () => {
    mockGet.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useEmployees());

    await expect(result.current.getEmployees()).rejects.toThrow(
      'Network Error',
    );
  });

  it('should fetch employee details successfully', async () => {
    const mockEmployeeDetails = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      hireDate: '2023-01-01',
      salary: 50000,
      role: 'admin',
    };

    const employeeId = '1';

    mockGet.mockResolvedValueOnce(mockEmployeeDetails);

    const { result } = renderHook(() => useEmployees());

    const employee = await result.current.getEmployeeDetails(employeeId);

    expect(mockGet).toHaveBeenCalledWith(`${endpoint}/${employeeId}`);
    expect(employee).toEqual(mockEmployeeDetails);
  });

  it('should throw an error if fetching employee details fails', async () => {
    const employeeId = '1';

    mockGet.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useEmployees());

    await expect(result.current.getEmployeeDetails(employeeId)).rejects.toThrow(
      'Network Error',
    );
  });
});
