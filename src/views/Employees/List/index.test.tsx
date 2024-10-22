import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmployeesList from '.';
import useEmployees from '../../../models/employees/useEmployees';
import { useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../../models/employees/useEmployees', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('EmployeesList component', () => {
  const mockNavigate = vi.fn();
  const mockGetEmployees = vi.fn();

  beforeEach(() => {
    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockNavigate,
    );

    (useEmployees as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      getEmployees: mockGetEmployees,
    });

    mockGetEmployees.mockResolvedValue([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        hireDate: '2023-01-01',
        salary: 50000,
        role: 'admin',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        hireDate: '2022-06-15',
        salary: 60000,
        role: 'user',
      },
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render employee data after fetch', async () => {
    render(<EmployeesList />);

    await waitFor(() => {
      expect(mockGetEmployees).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Jane Smith')).toBeTruthy();

    expect(screen.getByText('john.doe@example.com')).toBeTruthy();
    expect(screen.getByText('jane.smith@example.com')).toBeTruthy();

    expect(screen.getByText('50000 €')).toBeTruthy();
    expect(screen.getByText('60000 €')).toBeTruthy();

    expect(screen.getByText('Admin')).toBeTruthy();
    expect(screen.getByText('User')).toBeTruthy();
  });

  it('should navigate when clicking on a row', async () => {
    render(<EmployeesList />);

    await waitFor(() => {
      expect(mockGetEmployees).toHaveBeenCalledTimes(1);
    });

    const row = screen.getByText('John Doe').closest('tr');
    fireEvent.click(row!);

    expect(mockNavigate).toHaveBeenCalledWith('1');
  });

  it('should display the correct number of rows', async () => {
    render(<EmployeesList />);

    await waitFor(() => {
      expect(mockGetEmployees).toHaveBeenCalledTimes(1);
    });

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
  });
});
