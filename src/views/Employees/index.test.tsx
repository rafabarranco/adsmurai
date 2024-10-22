import { render, screen } from '@testing-library/react';
import Employees from '.';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./List', () => {
  return {
    __esModule: true,
    default: () => (
      <div data-testid="employees-list">Employees List Component</div>
    ),
  };
});

describe('Employees Component', () => {
  it('should render EmployeesList component', () => {
    render(<Employees />);

    const employeesList = screen.getByTestId('employees-list');
    expect(employeesList).toBeTruthy();
  });
});
