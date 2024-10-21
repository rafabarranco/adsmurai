import { FC, ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './config';

const AppRouter: FC = (): ReactElement => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
