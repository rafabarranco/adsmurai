import useApi from '../../core/api/useApi';

import { IEmployee, IEmployeeDetails, IUseEmployeesResult } from './types';

const useEmployees = (): IUseEmployeesResult => {
  const { get } = useApi();
  const endpoint = 'employees';

  const getEmployees = async (): Promise<IEmployee[]> => {
    try {
      return await get<IEmployee[]>(endpoint);
    } catch (error) {
      throw error as Error;
    }
  };

  const getEmployeeDetails = async (selectedEmployee: string) => {
    try {
      return await get<IEmployeeDetails>(`${endpoint}/${selectedEmployee}`);
    } catch (error) {
      throw error as Error;
    }
  };

  return { getEmployees, getEmployeeDetails };
};

export default useEmployees;
