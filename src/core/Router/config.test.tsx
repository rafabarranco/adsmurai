import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import router from './config';
import { describe, expect, vi, test } from 'vitest';

vi.mock('../../containers/Layout', () => ({
  default: ({ children }) => <div>Mock Layout {children}</div>,
}));

vi.mock('../../views/Employees/routes', () => ({
  default: [
    {
      path: 'employees',
      element: <div>Employees List</div>,
    },
  ],
}));

describe('Router Configuration', () => {
  test('should render Layout as the root element', () => {
    const { getByText } = render(<RouterProvider router={router} />);
    expect(getByText('Mock Layout')).toBeDefined();
  });

  test.skip('should render employees route correctly', () => {
    const memoryRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: <div>Mock Layout</div>,
          children: [
            {
              path: 'employees',
              element: <div>Employees List</div>,
            },
          ],
        },
      ],
      {
        initialEntries: ['/employees'],
      },
    );

    const { getByText } = render(<RouterProvider router={memoryRouter} />);

    expect(getByText('Employees List')).toBeDefined();
  });
});
