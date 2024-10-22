import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import employeesRouter from './routes';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="employees">Employees Component</div>,
  };
});

vi.mock('./Details', () => {
  return {
    __esModule: true,
    default: () => (
      <div data-testid="employee-details">Employee Details Component</div>
    ),
  };
});

describe('employeesRouter', () => {
  it('should render Employees component at the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          {employeesRouter.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </MemoryRouter>,
    );

    const employeesElement = screen.getByTestId('employees');
    expect(employeesElement).toBeTruthy();
    expect(employeesElement.textContent).toContain('Employees Component');
  });

  it('should render EmployeeDetails component for a specific ID path', () => {
    const employeeId = '123';
    render(
      <MemoryRouter initialEntries={[`/${employeeId}`]}>
        <Routes>
          {employeesRouter.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </MemoryRouter>,
    );

    const employeeDetailsElement = screen.getByTestId('employee-details');
    expect(employeeDetailsElement).toBeTruthy();
    expect(employeeDetailsElement.textContent).toContain(
      'Employee Details Component',
    );
  });
});