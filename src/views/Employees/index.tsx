import { FC, ReactElement } from 'react';

import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import EmployeesList from './List';
import { useNavigate } from 'react-router-dom';

const Employees: FC = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <Grid>
      <Grid
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography level="h1">Employee Management Platform</Typography>
        <Button onClick={() => navigate('create')}>Add employee</Button>
      </Grid>

      <EmployeesList></EmployeesList>
    </Grid>
  );
};

export default Employees;
