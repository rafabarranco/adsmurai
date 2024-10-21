import { RouteObject } from 'react-router-dom';

import Employees from '.';
import EmployeeDetails from './Details';

const employeesRouter: RouteObject[] = [
  {
    path: '/',
    element: <Employees />,
  },
  {
    path: '/:id',
    element: <EmployeeDetails />,
  },
];

export default employeesRouter;
