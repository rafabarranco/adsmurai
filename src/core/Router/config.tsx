import { createBrowserRouter } from 'react-router-dom';

import Layout from '../../containers/Layout';

import employeesRouter from '../../views/Employees/routes';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [...employeesRouter],
  },
]);

export default router;
