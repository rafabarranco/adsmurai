import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

import { DEPARTMENTS_ICONS } from './constants';

import { IEmployeeDetails } from '../../../models/employees/types';
import { EDepartments, TDepartments } from './types';
import { ERoles, ERolesColors } from '../types';

import styles from './styles';

const EmployeeDetails: FC = (): ReactElement => {
  const firstLaunch = useRef<boolean>(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const { getEmployeeDetails } = useEmployees();

  const [
    {
      firstName,
      lastName,
      email,
      department,
      role,
      salary,
      hireDate,
      dismissalDate,
      picture,
    },
    setEmployeeDetails,
  ] = useState<IEmployeeDetails>({} as IEmployeeDetails);

  const onHandleClick = () => navigate(-1);

  const parseDate = (date: string): string => {
    return date.substring(0, 10);
  };

  const fetchEmployeeDetails = async (): Promise<void> => {
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
    <Grid>
      <Button sx={{ marginBottom: '24px' }} onClick={onHandleClick}>
        Click here to go back
      </Button>
      <Card orientation="horizontal" sx={styles.Card}>
        <AspectRatio flex ratio="1" sx={styles.Picture}>
          <img src={picture} loading="lazy" alt={`${firstName} ${lastName}`} />
        </AspectRatio>
        <CardContent sx={styles.CardContent}>
          <Grid sx={styles.Info}>
            <Typography sx={styles.Name}>
              {firstName} {lastName}
            </Typography>
            <Typography sx={styles.Id}>{id}</Typography>
          </Grid>

          <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={styles.Email}
          >
            {email}
          </Typography>
          <Sheet sx={styles.Sheet}>
            <Grid>
              <Typography level="body-xs" sx={styles.DepartmentLabel}>
                Department
              </Typography>
              <Typography sx={styles.DepartmentValue}>
                {department && DEPARTMENTS_ICONS[department as TDepartments]}{' '}
                {EDepartments[department as TDepartments]}
              </Typography>
            </Grid>
            <Grid>
              <Typography level="body-xs" sx={styles.RoleLabel}>
                Role
              </Typography>
              <Typography
                sx={{
                  ...styles.RoleValue,
                  color: ERolesColors[role],
                }}
              >
                {ERoles[role]}
              </Typography>
            </Grid>
            <Grid>
              <Typography level="body-xs" sx={styles.SalaryLabel}>
                Salary
              </Typography>
              <Typography sx={styles.SalaryValue}>{`${salary} €`}</Typography>
            </Grid>
          </Sheet>
          <Grid sx={styles.HireInfo}>
            <Button variant="outlined" color="neutral" sx={styles.HireDate}>
              {hireDate ? parseDate(hireDate) : 'Unknown'}
            </Button>
            <Button
              variant="solid"
              color={dismissalDate ? 'danger' : 'success'}
              sx={styles.DismissalDate}
            >
              {dismissalDate ? parseDate(dismissalDate) : 'Currently hired'}
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EmployeeDetails;
