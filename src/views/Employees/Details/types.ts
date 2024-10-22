export type TDepartments = 'customer success' | 'engineering' | 'finance';

export enum EDepartments {
  'customer success' = 'Customer Success',
  engineering = 'IT',
  finance = 'Finance',
}

export type TStyles =
  | 'Card'
  | 'CardContent'
  | 'Picture'
  | 'Info'
  | 'Name'
  | 'Id'
  | 'Email'
  | 'Sheet'
  | 'DepartmentLabel'
  | 'DepartmentValue'
  | 'RoleLabel'
  | 'RoleValue'
  | 'SalaryLabel'
  | 'SalaryValue'
  | 'HireInfo'
  | 'HireDate'
  | 'DismissalDate';
