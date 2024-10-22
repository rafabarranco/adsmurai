import {
  CSSProperties,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/joy/Table';

import useEmployees from '../../../models/employees/useEmployees';

import getDaysFromDate from '../../../utils/dates/getDaysFromDate';

import { ROLES } from '../constants';

import { Employee } from '../../../models/employees/types';

import styles from './styles';

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
    <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: '25%' }}>Name</th>
          <th style={{ width: '15%' }}>Days since hired</th>
          <th style={{ width: '30%' }}>Email</th>
          <th style={{ width: '20%' }}>Salary</th>
          <th style={{ width: '10%' }}>Role</th>
        </tr>
      </thead>
      <tbody>
        {employeeList.map(
          ({ id, email, firstName, lastName, hireDate, salary, role }) => (
            <tr
              key={id}
              onClick={() => onHandleClick(id)}
              style={styles.TableRow as CSSProperties}
            >
              <td>
                {firstName} {lastName}
              </td>
              <td>{getDaysFromDate(hireDate)} days ago</td>
              <td>{email}</td>
              <td>{salary} €</td>
              <td style={{ color: ROLES[role] }}>
                {role[0].toUpperCase() + role.substring(1).toLowerCase()}
              </td>
            </tr>
          ),
        )}
      </tbody>
    </Table>
  );
};

export default EmployeesList;
