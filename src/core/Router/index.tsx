import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Employees from '../../Employees';
import Layout from '../../containers/Layout';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [{ path: '/', element: <Employees /> }],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
