import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Employees from '../../Employees';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Employees />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
