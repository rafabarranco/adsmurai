import useApi from '../../core/api/useApi';

import { Employee, UseEmployeesResult } from './types';

const useEmployees = (): UseEmployeesResult => {
  const { get } = useApi();
  const endpoint = 'employees';

  const getEmployees = async (): Promise<Employee[]> => {
    try {
      return await get<Employee[]>(endpoint);
    } catch (error) {
      throw error as Error;
    }
  };

  const getEmployeeDetails = async (selectedEmployee: string) => {
    try {
      return await get<Employee>(`${endpoint}/${selectedEmployee}`);
    } catch (error) {
      throw error as Error;
    }
  };

  return { getEmployees, getEmployeeDetails };
};

export default useEmployees;
