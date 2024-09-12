import { render, screen } from '@testing-library/react';
import EmployeeDetail from './EmployeeDetail';
import { vi, expect } from 'vitest';

test('renders', () => {
  render(<EmployeeDetail employee={0} handleGoToEmployeesPage={vi.fn()}/>);
  expect(screen.getByText(/Role/i)).toBeDefined();
});