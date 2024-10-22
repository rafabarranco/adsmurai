import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import EmployeesList from './List';

const Employees = () => {
  return (
    <Grid>
      <Typography level="h1">Employee Management Platform</Typography>
      <EmployeesList></EmployeesList>
    </Grid>
  );
};

export default Employees;
