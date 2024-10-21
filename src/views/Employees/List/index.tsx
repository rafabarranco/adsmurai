import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

import useEmployees from '../../../models/employees/useEmployees';

import getDaysFromDate from '../../../utils/dates/getDaysFromDate';

import { Employee } from '../../../models/employees/types';
import { useNavigate } from 'react-router-dom';

const EmployeesList: FC = (): ReactElement => {
  const firstLaunch = useRef(true);
  const navigate = useNavigate();

  const { getEmployees } = useEmployees();

  const [employeeList, setEmployeeList] = useState<Employee[]>([]);

  const onHandleClick = (id: string) => {
    navigate(`${id}`);
  };

  const fetchData = async () => {
    const data = await getEmployees();
    setEmployeeList(data);
  };

  useEffect(() => {
    if (firstLaunch.current) {
      fetchData();
      firstLaunch.current = false;
    }
  }, []);

  return (
    <TableContainer component={Paper} elevation={3}>
      <Typography variant="h5" component="h2" sx={{ padding: 2 }}>
        Employee List
      </Typography>
      <Table aria-label="Employee list table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Days since hired</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Salary</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeList.map(
            ({ id, email, firstName, lastName, hireDate, salary, role }) => (
              <TableRow key={id}>
                <TableCell align="left">
                  {firstName} {lastName}
                </TableCell>
                <TableCell align="center">
                  {getDaysFromDate(hireDate)}
                </TableCell>
                <TableCell align="center">{email}</TableCell>
                <TableCell align="center">{salary}</TableCell>
                <TableCell align="center">{role}</TableCell>
                <TableCell align="center" onClick={() => onHandleClick(id)}>
                  Details
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesList;

/* import { useEffect, useState } from 'react';
import './App.scss';

import EmployeeDetail from './EmployeeDetail';
import { DataProvider } from './Context';
import useEmployees from './models/employees/useEmployees';
import { Employee } from './models/employees/types';

const Employees = (): React.ReactElement => {
  const { getEmployees, getEmployeeDetails } = useEmployees();
  const [data, setData] = useState<Employee[]>([]);
  const [employee, setEmployee] = useState<Employee>({} as Employee);
  const [view, setView] = useState({ page: 'employees', selectedEmployee: -1 });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const data = await getEmployees();
    setData(data);
    setLoading(false);
  };

  const employeefetchData = async () => {
    const data = await getEmployeeDetails(view.selectedEmployee.toString());
    setEmployee(data);
    setLoading(false);
  };

  useEffect(() => {
    if (view.page == 'employees') {
      const fetchedData = fetchData();
      setData(fetchedData as any);
    }

    if (view.page == 'employee-detail') {
      const newData = employeefetchData();
      setEmployee(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.page]);

  const EmployeesManagerPlatformHeader = () => {
    return (
      <h1
        style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        Employee Management Platform
      </h1>
    );
  };

  const EmployeesBodyTable = React.memo(
    ({
      employees,
    }: {
      employees: {
        id: number;
        firstName: string;
        lastName: string;
        hireDate: string;
        email: string;
        salary: number;
        role: string;
        totalSalary: number;
      }[];
    }) => {
      const roleTag = (role: string) => {
        if (role == 'user') {
          return <div className="tag user">User</div>;
        } else if (role == 'admin') {
          return <div className="tag admin">Admin</div>;
        } else if (role == 'superadmin') {
          return <div className="tag superadmin">Superadmin</div>;
        } else {
          return <div className="tag">Unknown</div>;
        }
      };

      return (
        <tbody>
          {!!employees.length &&
            employees.map((employee: any, index: number) => {
              const d = Number(
                new Date().getTime() - new Date(employee.hireDate).getTime(),
              );
              const date = String(Math.floor(d / 86400000));
              const daysSinceHireDate = date + ' ' + 'days ago';
              const employeeEmail = employee.email;

              const number = String(employee.salary);

              return (
                <tr>
                  <td
                    onClick={() => {
                      setView({
                        page: 'employee-detail',
                        selectedEmployee: index + 1,
                      });
                    }}
                  >
                    {employee.dismissalDate
                      ? '(Dismissed) ' +
                        employee.firstName +
                        ' ' +
                        employee.lastName
                      : employee.firstName + ' ' + employee.lastName}
                  </td>
                  <td>{daysSinceHireDate}</td>
                  <td>{employeeEmail}</td>
                  <td>{number + ' €'}</td>
                  <td>{roleTag(employee.role)}</td>
                  <td>{employee.totalSalary}</td>
                </tr>
              );
            })}
        </tbody>
      );
    },
  );

  const Page = () => {
    switch (view.page) {
      case 'employees':
        return (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Days since hired</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Role</th>
              </tr>
            </thead>
            <EmployeesBodyTable employees={data} />
          </table>
        );
      case 'employee-detail':
        return (
          <EmployeeDetail
            employee={data[view.selectedEmployee || 0].id}
            handleGoToEmployeesPage={() => {
              setView({ page: 'employees', selectedEmployee: -1 });
            }}
          />
        );
    }
  };

  return (
    <>
      <DataProvider employee={employee}>
        <EmployeesManagerPlatformHeader />
        {!loading && Page()}
      </DataProvider>
    </>
  );
};

export default Employees;
 */
