import { RouteObject } from 'react-router-dom';

import Employees from '.';
import EmployeeForm from './Form';

const employeesRouter: RouteObject[] = [
  {
    path: '/',
    element: <Employees />,
  },
  {
    path: '/:id',
    element: <EmployeeForm />,
  },
  {
    path: '/create',
    element: <EmployeeForm />,
  },
];

export default employeesRouter;
