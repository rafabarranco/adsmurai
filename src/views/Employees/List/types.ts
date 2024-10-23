import { CSSProperties } from 'react';

export interface IEmployeesListHeaders {
  id: string;
  label: string;
  styles: CSSProperties;
}

export enum ERoles {
  user = 'User',
  admin = 'Admin',
  superadmin = 'Superadmin',
}

export enum ERolesColors {
  user = '#4c9baf95',
  admin = '#f5a52387',
  superadmin = '#f5454284',
}
