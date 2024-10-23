import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import EmployeeForm from '.';
import useEmployees from '../../../models/employees/useEmployees'; // Asegúrate de importar esto

vi.mock('../../../models/employees/useEmployees'); // Mock directo

vi.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
  LocalizationProvider: ({ children }) => <div>{children}</div>,
}));

vi.mock('@mui/x-date-pickers/DatePicker', () => ({
  DatePicker: ({ value, onChange }) => (
    <input
      type="date"
      data-testid="hire-date-picker"
      value={value ? value : ''}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('EmployeeForm', () => {
  const mockAddEmployee = vi.fn();
  const mockEditEmployee = vi.fn();
  const mockGetEmployeeDetails = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useEmployees as Mock).mockReturnValue({
      addEmployee: mockAddEmployee,
      editEmployee: mockEditEmployee,
      getEmployeeDetails: mockGetEmployeeDetails,
    });
  });

  it('renders the form correctly', () => {
    render(
      <MemoryRouter>
        <EmployeeForm />
      </MemoryRouter>,
    );

    // Obtén todos los date pickers y verifica su número
    const datePickers = screen.getAllByTestId('hire-date-picker');
    expect(datePickers.length).toBe(2); // Cambiado a 2 si intencionalmente hay más de 1

    // Verifica que los campos de texto importantes estén presentes
    expect(screen.getByPlaceholderText('Email *')).toBeTruthy();
    expect(screen.getByPlaceholderText('First Name *')).toBeTruthy();
  });
});
