import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import EmployeesList from './List';

import styles from './styles';

const Employees: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Grid sx={styles.container}>
      <Grid sx={styles.header}>
        <Typography level="h1" sx={styles.title}>
          Employee Management Platform
        </Typography>
        <Button sx={styles.button} onClick={() => navigate('create')}>
          Add employee
        </Button>
      </Grid>

      <EmployeesList />
    </Grid>
  );
};

export default Employees;
