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

import getDaysFromDate from '../../../utils/functions/dates/getDaysFromDate';

import { EMPLOYEES_LIST_HEADERS } from './constants';

import { IEmployee } from '../../../models/employees/types';
import { ERoles, ERolesColors } from './types';

import styles from './styles';

const EmployeesList: FC = (): ReactElement => {
  const firstLaunch = useRef(true);
  const navigate = useNavigate();

  const { getEmployees } = useEmployees();

  const [employeeList, setEmployeeList] = useState<IEmployee[]>([]);

  const onHandleClick = (id: string) => {
    navigate(id);
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
          {EMPLOYEES_LIST_HEADERS.map(({ id, label, styles }) => (
            <th key={id} style={styles}>
              {label}
            </th>
          ))}
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
              <td style={{ color: ERolesColors[role] }}>{ERoles[role]}</td>
            </tr>
          ),
        )}
      </tbody>
    </Table>
  );
};

export default EmployeesList;
