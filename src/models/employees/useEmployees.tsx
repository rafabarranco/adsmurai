import useApi from '../../core/api/useApi';

import { IEmployee, IEmployeeDetails, IUseEmployeesResult } from './types';

const useEmployees = (): IUseEmployeesResult => {
  const { get, post, put } = useApi();
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

  const addEmployee = async (body: IEmployeeDetails) => {
    try {
      return await post<IEmployeeDetails, IEmployeeDetails>(endpoint, body);
    } catch (error) {
      throw error as Error;
    }
  };

  const editEmployee = async (
    selectedEmployee: string,
    body: IEmployeeDetails,
  ) => {
    try {
      return await put<IEmployeeDetails, IEmployeeDetails>(
        `${endpoint}/${selectedEmployee}`,
        body,
      );
    } catch (error) {
      throw error as Error;
    }
  };

  return { getEmployees, getEmployeeDetails, addEmployee, editEmployee };
};

export default useEmployees;
