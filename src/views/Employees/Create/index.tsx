import { FC, ReactElement } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import Grid from '@mui/joy/Grid';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Card from '@mui/joy/Card';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import useEmployees from '../../../models/employees/useEmployees';

import schema from './validations';

import { TEmployeeCreation } from './types';
import { IEmployeeDetails } from '../../../models/employees/types';
import { useNavigate } from 'react-router-dom';

const EmployeeCreation: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { addEmployee } = useEmployees();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<TEmployeeCreation>({
    resolver: zodResolver(schema),
    defaultValues: {
      picture: '',
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      role: '',
      salary: 0,
      hireDate: '',
      dismissalDate: null,
    },
  });

  const handleFileChange = (fileURL: string) => {
    setValue('picture', fileURL);
  };

  const onSubmit: SubmitHandler<TEmployeeCreation> = async (data) => {
    try {
      await addEmployee({
        ...data,
        id: uuidv4(),
      } as IEmployeeDetails);
      navigate('/');
    } catch (error) {
      console.error(error as Error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card variant="outlined" sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Typography level="h4" textAlign="center" sx={{ mb: 2 }}>
          Employee Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <FormLabel>Avatar *</FormLabel>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleFileChange(event.target.value)}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl error={!!errors.email}>
                <Input
                  type="email"
                  placeholder="Email *"
                  {...register('email')}
                  error={!!errors.email}
                />
                {errors.email && (
                  <Typography color="danger">{errors.email.message}</Typography>
                )}
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl error={!!errors.firstName}>
                <Input
                  placeholder="First Name *"
                  {...register('firstName')}
                  error={!!errors.firstName}
                />
                {errors.firstName && (
                  <Typography color="danger">
                    {errors.firstName.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl error={!!errors.lastName}>
                <Input
                  placeholder="Last Name *"
                  {...register('lastName')}
                  error={!!errors.lastName}
                />
                {errors.lastName && (
                  <Typography color="danger">
                    {errors.lastName.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid xs={12} sm={5}>
              <FormControl error={!!errors.department}>
                <Controller
                  name="department"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select
                      placeholder="Select department *"
                      onChange={(_, newValue) => onChange(newValue)} // Cambia para recibir newValue
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                    >
                      <Option value="customer success">Customer Success</Option>
                      <Option value="engineering">Engineering</Option>
                      <Option value="finance">Finance</Option>
                    </Select>
                  )}
                />
                {errors.department && (
                  <Typography color="danger">
                    {errors.department.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid xs={12} sm={5}>
              <FormControl error={!!errors.role}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select
                      placeholder="Select role *"
                      onChange={(_, newValue) => onChange(newValue)} // Cambia para recibir newValue
                      onBlur={onBlur}
                      value={value}
                      ref={ref}
                    >
                      <Option value="user">User</Option>
                      <Option value="admin">Admin</Option>
                      <Option value="superadmin">Superadmin</Option>
                    </Select>
                  )}
                />
                {errors.role && (
                  <Typography color="danger">{errors.role.message}</Typography>
                )}
              </FormControl>
            </Grid>
            <Grid xs={12} sm={2}>
              <FormControl error={!!errors.salary}>
                <Input
                  type="number"
                  placeholder="Salary *"
                  {...register('salary', {
                    setValueAs: (value) => (value === '' ? 0 : Number(value)),
                  })}
                  error={!!errors.salary}
                />
                {errors.salary && (
                  <Typography color="danger">
                    {errors.salary.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid xs={12} sm={6}>
              <FormControl error={!!errors.hireDate}>
                <FormLabel>Hire date *</FormLabel>
                <Controller
                  name="hireDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date: Dayjs | null) =>
                        field.onChange(date ? date.toISOString() : null)
                      }
                    />
                  )}
                />
                {errors.hireDate && (
                  <Typography color="danger">
                    {errors.hireDate.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl>
                <FormLabel>Dismissal date</FormLabel>
                <Controller
                  name="dismissalDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date: Dayjs | null) =>
                        field.onChange(date ? date.toISOString() : null)
                      }
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid textAlign="center" sx={{ mt: 3 }}>
            <Button type="submit" variant="solid" sx={{ px: 4 }}>
              Submit
            </Button>
          </Grid>
        </form>
      </Card>
    </LocalizationProvider>
  );
};

export default EmployeeCreation;
