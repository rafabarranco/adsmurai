type EmployeeRole = 'user' | 'admin' | 'superadmin';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department?: string;
  role: EmployeeRole;
  salary: number;
  picture?: string;
  hireDate: string;
  dismissalDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface UseEmployeesResult {
  getEmployees: () => Promise<Employee[]>;
  getEmployeeDetails: (selectedEmployee: string) => Promise<Employee>;
}
