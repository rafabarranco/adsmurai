import { z } from 'zod';

const schema = z.object({
  picture: z.string().min(1, { message: 'Picture is required' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Surname is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Must be a valid email'),
  department: z.string().min(1, { message: 'Department is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  salary: z.number().min(1, { message: 'Salary is required' }),
  hireDate: z.string().min(1, 'Hire date is required'),
  dismissalDate: z.string().nullable(),
});

export default schema;
