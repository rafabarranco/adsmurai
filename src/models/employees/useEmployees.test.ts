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
  const mockPost = vi.fn();
  const mockPut = vi.fn();
  const endpoint = 'employees';

  beforeEach(() => {
    (useApi as Mock).mockImplementation(() => ({
      get: mockGet,
      post: mockPost,
      put: mockPut,
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
        department: 'engineering',
        picture: 'path/to/picture',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        hireDate: '2022-06-15',
        salary: 60000,
        role: 'user',
        department: 'finance',
        picture: 'path/to/picture',
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
      department: 'customer success',
      picture: 'path/to/picture',
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

  it('should add an employee successfully', async () => {
    const newEmployee = {
      id: '3',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      hireDate: '2023-10-01',
      salary: 55000,
      role: 'user',
      department: 'engineering',
      picture: 'path/to/picture',
    };

    mockPost.mockResolvedValueOnce(newEmployee);

    const { result } = renderHook(() => useEmployees());

    const employee = await result.current.addEmployee(newEmployee);

    expect(mockPost).toHaveBeenCalledWith(endpoint, newEmployee);
    expect(employee).toEqual(newEmployee);
  });

  it('should throw an error if adding an employee fails', async () => {
    const newEmployee = {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      hireDate: '2023-10-01',
      salary: 55000,
      role: 'user',
    };

    mockPost.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useEmployees());

    await expect(result.current.addEmployee(newEmployee)).rejects.toThrow(
      'Network Error',
    );
  });

  it('should edit an employee successfully', async () => {
    const updatedEmployee = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      hireDate: '2023-01-01',
      salary: 52000,
      role: 'admin',
    };

    const employeeId = '1';

    mockPut.mockResolvedValueOnce(updatedEmployee);

    const { result } = renderHook(() => useEmployees());

    const employee = await result.current.editEmployee(
      employeeId,
      updatedEmployee,
    );

    expect(mockPut).toHaveBeenCalledWith(
      `${endpoint}/${employeeId}`,
      updatedEmployee,
    );
    expect(employee).toEqual(updatedEmployee);
  });

  it('should throw an error if editing an employee fails', async () => {
    const updatedEmployee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      hireDate: '2023-01-01',
      salary: 52000,
      role: 'admin',
    };

    const employeeId = '1';

    mockPut.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useEmployees());

    await expect(
      result.current.editEmployee(employeeId, updatedEmployee),
    ).rejects.toThrow('Network Error');
  });
});
