import { RouteObject } from 'react-router-dom';

import Employees from '.';
import EmployeeDetails from './Details';
import EmployeeCreation from './Create';

const employeesRouter: RouteObject[] = [
  {
    path: '/',
    element: <Employees />,
  },
  {
    path: '/:id',
    element: <EmployeeDetails />,
  },
  {
    path: '/create',
    element: <EmployeeCreation />,
  },
];

export default employeesRouter;
