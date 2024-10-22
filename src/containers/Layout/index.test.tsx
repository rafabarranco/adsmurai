import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '.';
import { describe, expect, vi, test } from 'vitest';

const TestComponent = () => <div>Content in Outlet</div>;

vi.mock('../Header', () => ({
  default: () => <div>Header Mock</div>,
}));

vi.mock('../Footer', () => ({
  default: () => <div>Footer Mock</div>,
}));

describe('Layout Component', () => {
  test('should render Header, Outlet, and Footer', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TestComponent />} />{' '}
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Header Mock')).toBeTruthy();

    expect(screen.getByText('Footer Mock')).toBeTruthy();

    expect(screen.getByText('Content in Outlet')).toBeTruthy();
  });
});
