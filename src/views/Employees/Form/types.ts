import { z } from 'zod';
import schema from './validations';

export type TEmployeeCreation = z.infer<typeof schema>;
