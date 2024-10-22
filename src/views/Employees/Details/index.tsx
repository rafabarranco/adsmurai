import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  Typography,
  Sheet,
  Grid,
} from '@mui/joy';

import useEmployees from '../../../models/employees/useEmployees';

import { DEPARTMENTS } from './constants';
import { ROLES } from '../constants';

import { Employee } from '../../../models/employees/types';
import { Departments } from './types';
import styles from './styles';

const EmployeeDetails: FC = (): ReactElement => {
  const { id } = useParams();
  const { getEmployeeDetails } = useEmployees();
  const firstLaunch = useRef<boolean>(true);
  const [employeeDetails, setEmployeeDetails] = useState<Employee>(
    {} as Employee,
  );

  const fetchEmployeeDetails = async () => {
    const data = await getEmployeeDetails(id || '');
    setEmployeeDetails(data);
  };

  useEffect(() => {
    if (firstLaunch.current) {
      fetchEmployeeDetails();
      firstLaunch.current = false;
    }
  }, []);

  return (
    <Card orientation="horizontal" sx={styles.Card}>
      <AspectRatio flex ratio="1" sx={styles.Picture}>
        <img
          src={employeeDetails.picture}
          loading="lazy"
          alt={`${employeeDetails.firstName} ${employeeDetails.lastName}`}
        />
      </AspectRatio>
      <CardContent sx={styles.CardContent}>
        <Grid sx={styles.Info}>
          <Typography sx={styles.Name}>
            {employeeDetails.firstName} {employeeDetails.lastName}
          </Typography>
          <Typography sx={styles.Id}>{employeeDetails.id}</Typography>
        </Grid>

        <Typography level="body-sm" textColor="text.tertiary" sx={styles.Email}>
          {employeeDetails.email}
        </Typography>
        <Sheet sx={styles.Sheet}>
          <Grid>
            <Typography level="body-xs" sx={styles.DepartmentLabel}>
              Department
            </Typography>
            <Typography sx={styles.DepartmentValue}>
              {employeeDetails.department &&
                DEPARTMENTS[employeeDetails.department as Departments]}{' '}
              {employeeDetails.department?.toLocaleUpperCase()}
            </Typography>
          </Grid>
          <Grid>
            <Typography level="body-xs" sx={styles.RoleLabel}>
              Role
            </Typography>
            <Typography
              sx={{ ...styles.RoleValue, color: ROLES[employeeDetails.role] }}
            >
              {employeeDetails.role?.toLocaleUpperCase()}
            </Typography>
          </Grid>
          <Grid>
            <Typography level="body-xs" sx={styles.SalaryLabel}>
              Salary
            </Typography>
            <Typography sx={styles.SalaryValue}>
              {`${employeeDetails.salary}€`}
            </Typography>
          </Grid>
        </Sheet>
        <Grid sx={styles.HireInfo}>
          <Button variant="outlined" color="neutral" sx={styles.HireDate}>
            {employeeDetails.hireDate
              ? employeeDetails.hireDate.substring(0, 10)
              : 'Unknown'}
          </Button>
          <Button
            variant="solid"
            color={employeeDetails.dismissalDate ? 'danger' : 'success'}
            sx={styles.DismissalDate}
          >
            {employeeDetails.dismissalDate
              ? employeeDetails.dismissalDate.substring(0, 10)
              : 'Currently hired'}
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
