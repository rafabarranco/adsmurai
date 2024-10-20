type EmployeeRole = 'user' | 'admin' | 'superadmin';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  hireDate: string;
  email: string;
  salary: number;
  totalSalary: number;
  role: EmployeeRole;
}

export interface UseEmployeesResult {
  getEmployees: () => Promise<Employee[]>;
  getEmployeeDetails: (selectedEmployee: string) => Promise<Employee>;
}
