import useApi from '../../core/api/useApi';

import { Employee, UseEmployeesResult } from './types';

const useEmployees = (): UseEmployeesResult => {
  const { get } = useApi();
  const endpoint = 'employees';

  const getEmployees = async (): Promise<Employee[]> => {
    try {
      const data = await get<Employee[]>(endpoint);
      return data;
    } catch (error) {
      throw error as Error;
    }
  };

  const getEmployeeDetails = async (selectedEmployee: string) => {
    try {
      const data = await get<Employee>(`${endpoint}/${selectedEmployee}`);
      return data;
    } catch (error) {
      throw error as Error;
    }
  };

  return { getEmployees, getEmployeeDetails };
};

export default useEmployees;
