import { render, screen } from '@testing-library/react';
import Employees from '.';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('./List', () => {
  return {
    __esModule: true,
    default: () => (
      <div data-testid="employees-list">Employees List Component</div>
    ),
  };
});

describe('Employees Component', () => {
  it('should render EmployeesList component and other elements', () => {
    render(
      <MemoryRouter>
        <Employees />
      </MemoryRouter>,
    );

    const employeesList = screen.getByTestId('employees-list');
    expect(employeesList).toBeTruthy();
    expect(employeesList.textContent).toContain('Employees List Component');

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Employee Management Platform');

    const buttonElement = screen.getByRole('button', { name: /add employee/i });
    expect(buttonElement).toBeTruthy();
  });
});
