export type TEmployeeRole = 'user' | 'admin' | 'superadmin';

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TEmployeeRole;
  salary: number;
  hireDate: string;
}

export interface IEmployeeDetails extends IEmployee {
  department: string;
  picture: string;
  dismissalDate: string | null;
}

export interface IUseEmployeesResult {
  getEmployees: () => Promise<IEmployee[]>;
  getEmployeeDetails: (selectedEmployee: string) => Promise<IEmployeeDetails>;
  addEmployee: (body: IEmployeeDetails) => Promise<IEmployeeDetails>;
  editEmployee: (
    selectedEmployee: string,
    body: IEmployeeDetails,
  ) => Promise<IEmployeeDetails>;
}
