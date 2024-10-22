import { render, screen, waitFor } from '@testing-library/react';
import EmployeeDetails from '.';
import useEmployees from '../../../models/employees/useEmployees';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../../../models/employees/useEmployees', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('EmployeeDetails component', () => {
  const mockGetEmployeeDetails = vi.fn();

  beforeEach(() => {
    (useEmployees as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      getEmployeeDetails: mockGetEmployeeDetails,
    });

    mockGetEmployeeDetails.mockResolvedValue({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      picture: 'https://example.com/picture.jpg',
      department: 'engineering',
      role: 'admin',
      salary: 70000,
      hireDate: '2023-01-01',
      dismissalDate: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render employee details after fetch', async () => {
    render(
      <MemoryRouter initialEntries={['/employee/1']}>
        <Routes>
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockGetEmployeeDetails).toHaveBeenCalledWith('1');
    });

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('john.doe@example.com')).toBeTruthy();
    expect(screen.getByText('70000€')).toBeTruthy();
    expect(screen.getByText('Department')).toBeTruthy();
    expect(screen.getByText('ENGINEERING')).toBeTruthy();
    expect(screen.getByText('ADMIN')).toBeTruthy();
    expect(screen.getByText('2023-01-01')).toBeTruthy();
    expect(screen.getByText('Currently hired')).toBeTruthy();

    const img = screen.getByRole('img');
    expect(img).toHaveProperty('src', 'https://example.com/picture.jpg');
  });

  it('should display "Currently hired" when no dismissal date is provided', async () => {
    mockGetEmployeeDetails.mockResolvedValueOnce({
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      picture: 'https://example.com/picture2.jpg',
      department: 'hr',
      role: 'user',
      salary: 60000,
      hireDate: '2022-06-15',
      dismissalDate: null,
    });

    render(
      <MemoryRouter initialEntries={['/employee/2']}>
        <Routes>
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockGetEmployeeDetails).toHaveBeenCalledWith('2');
    });

    expect(screen.getByText('Currently hired')).toBeTruthy();
  });

  it('should display dismissal date when provided', async () => {
    mockGetEmployeeDetails.mockResolvedValueOnce({
      id: '3',
      firstName: 'Mike',
      lastName: 'Brown',
      email: 'mike.brown@example.com',
      picture: 'https://example.com/picture3.jpg',
      department: 'marketing',
      role: 'manager',
      salary: 80000,
      hireDate: '2020-01-01',
      dismissalDate: '2023-01-01',
    });

    render(
      <MemoryRouter initialEntries={['/employee/3']}>
        <Routes>
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockGetEmployeeDetails).toHaveBeenCalledWith('3');
    });

    expect(screen.getByText('2023-01-01')).toBeTruthy();
  });
});
