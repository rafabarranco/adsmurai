/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import './App.scss'
import axios from 'axios'
import React from 'react';
import EmployeeDetail from './EmployeeDetail';
import { DataProvider } from './Context';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
});

const Employees = (): React.ReactElement => {
  const [data, setData] = useState<any>([])
  const [employee, setEmployee] = useState<any>({})
  const [view, setView] = useState({ page: 'employees', selectedEmployee: -1 })
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    await instance.get('employees', { method: 'GET' }).then((response) => {
      setData(response.data);
      setLoading(false);
    })
  }

  const employeefetchData = async () => {
    await instance.get(`employees/${view.selectedEmployee}`, { method: 'GET' }).then((response) => {
      setEmployee(response.data);
      setLoading(false);
    })
  }

  useEffect(() => {
    if (view.page == 'employees') {
      const fetchedData = fetchData();
      setData(fetchedData as any);
    }

    if (view.page == 'employee-detail') {
      const newData = employeefetchData();
      setEmployee(newData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.page])


  const EmployeesManagerPlatformHeader = () => {
    return (<h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
      Employee Management Platform
    </h1>)
  }

  const EmployeesBodyTable = React.memo(({ employees }: {
    employees: {
      id: number;
      firstName: string;
      lastName: string;
      hireDate: string;
      email: string;
      salary: number;
      role: string;
      totalSalary: number;
    }[]
  }) => {
    const roleTag = (role: string) => {
      if (role == 'user') {
        return <div className='tag user'>User</div>
      } else if (role == 'admin') {
        return <div className='tag admin'>Admin</div>
      } else if (role == 'superadmin') {
        return <div className='tag superadmin'>Superadmin</div>
      } else {
        return <div className='tag'>Unknown</div>
      }
    }

    return (
      <tbody>
        {!!employees.length &&
          employees.map((employee: any, index: number) => {
            const d = Number(new Date().getTime() - new Date(employee.hireDate).getTime());
            const date = String(Math.floor(d / 86400000));
            const daysSinceHireDate = date + " " + "days ago";
            const employeeEmail = employee.email;

            const number = String(employee.salary)

            return (
              <tr>
                <td onClick={() => {
                  setView({ page: 'employee-detail', selectedEmployee: index + 1 })
                }}>{
                    employee.dismissalDate ? '(Dismissed) ' + employee.firstName + " " + employee.lastName : employee.firstName + " " + employee.lastName
                  }</td>
                <td>{daysSinceHireDate}</td>
                <td>{employeeEmail}</td>
                <td>{number + " €"}</td>
                <td>{roleTag(employee.role)}</td>
                <td>{employee.totalSalary}</td>
              </tr>
            );
          })}
      </tbody>
    );
  });

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
          </table>)
      case 'employee-detail':
        return <EmployeeDetail employee={data[view.selectedEmployee || 0].id} handleGoToEmployeesPage={() => {
          setView({ page: 'employees', selectedEmployee: -1 })
        }} />
    }
  }

  return (
    <>
      <DataProvider employee={employee}>
        <EmployeesManagerPlatformHeader />
        {!loading && Page()}
      </DataProvider>
    </>
  )
}

export default Employees
