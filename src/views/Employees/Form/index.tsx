import {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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
import Avatar from '@mui/joy/Avatar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import useEmployees from '../../../models/employees/useEmployees';
import GoBack from '../../../components/GoBack';
import { DEFAULT_VALUES } from './constants';
import schema from './validations';
import { TEmployeeCreation } from './types';
import { IEmployeeDetails } from '../../../models/employees/types';
import styles from './styles'; // Import styles

const EmployeeForm: FC = (): ReactElement => {
  const firstLaunch = useRef<boolean>(true);
  const { id: employeeId } = useParams();
  const { addEmployee, editEmployee, getEmployeeDetails } = useEmployees();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<TEmployeeCreation>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const parseToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setValue('picture', base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      parseToBase64(file);
    }
  };

  const onSubmit: SubmitHandler<TEmployeeCreation> = async (data) => {
    try {
      if (employeeId) {
        await editEmployee(employeeId, {
          ...data,
          id: employeeId,
        } as IEmployeeDetails);
      }
      if (!employeeId) {
        await addEmployee({
          ...data,
          id: uuidv4(),
        } as IEmployeeDetails);
      }
    } catch (error) {
      console.error(error as Error);
    }
  };

  const fetchEmployeeDetails = async (): Promise<void> => {
    const data = await getEmployeeDetails(employeeId || '');
    reset({
      ...data,
      hireDate: data.hireDate ? dayjs(data.hireDate).toISOString() : '',
      dismissalDate: data.dismissalDate
        ? dayjs(data.dismissalDate).toISOString()
        : null,
    });
    setImagePreview(data.picture);
  };

  useEffect(() => {
    if (firstLaunch.current && employeeId) {
      fetchEmployeeDetails();
      firstLaunch.current = false;
    }
  }, []);

  return (
    <Grid>
      <GoBack styles={{ marginBottom: '24px' }} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card variant="outlined" sx={styles.Card}>
          <Typography level="h4" sx={styles.Header}>
            Employee Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={6}>
                <FormLabel>Avatar *</FormLabel>
                <Avatar
                  src={imagePreview || '/default-avatar.png'}
                  alt="Avatar"
                  sx={styles.Avatar}
                />
                <FormControl error={!!errors.picture}>
                  <input
                    type="file"
                    accept="image/*"
                    name="picture"
                    onChange={handleFileChange}
                  />
                  {errors.picture && (
                    <Typography sx={styles.FormControlError}>
                      {errors.picture.message}
                    </Typography>
                  )}
                </FormControl>
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
                    <Typography sx={styles.FormControlError}>
                      {errors.email.message}
                    </Typography>
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
                    <Typography sx={styles.FormControlError}>
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
                    <Typography sx={styles.FormControlError}>
                      {errors.lastName.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={styles.GridSpacing}>
              <Grid xs={12} sm={5}>
                <FormControl error={!!errors.department}>
                  <Controller
                    name="department"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select
                        placeholder="Select department *"
                        onChange={(_, newValue) => onChange(newValue)}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                      >
                        <Option value="customer success">
                          Customer Success
                        </Option>
                        <Option value="engineering">Engineering</Option>
                        <Option value="finance">Finance</Option>
                      </Select>
                    )}
                  />
                  {errors.department && (
                    <Typography sx={styles.FormControlError}>
                      {errors.department.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={12} sm={4}>
                <FormControl error={!!errors.role}>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select
                        placeholder="Select role *"
                        onChange={(_, newValue) => onChange(newValue as string)}
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
                    <Typography sx={styles.FormControlError}>
                      {errors.role.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={12} sm={3}>
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
                    <Typography sx={styles.FormControlError}>
                      {errors.salary.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={styles.GridSpacing}>
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
                    <Typography sx={styles.FormControlError}>
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
            <Grid sx={styles.ButtonContainer}>
              <Button
                type="reset"
                variant="solid"
                sx={styles.ClearButton}
                onClick={() => {
                  reset(DEFAULT_VALUES);
                  setImagePreview(null);
                }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="solid"
                sx={styles.SubmitButton}
                disabled={!isValid || !isDirty}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Card>
      </LocalizationProvider>
    </Grid>
  );
};

export default EmployeeForm;
