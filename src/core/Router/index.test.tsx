import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppRouter from '.';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...(actual as object),
    RouterProvider: () => <div>Mock RouterProvider</div>,
    createBrowserRouter: vi.fn(() => ({})),
  };
});

describe('AppRouter', () => {
  it('should render RouterProvider with the correct router', () => {
    const { getByText } = render(<AppRouter />);

    expect(getByText('Mock RouterProvider')).toBeDefined();
  });
});
