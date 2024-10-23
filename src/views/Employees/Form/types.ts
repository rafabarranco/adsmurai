import { z } from 'zod';
import schema from './validations';

export type TEmployeeCreation = z.infer<typeof schema>;

export type TStyles =
  | 'Card'
  | 'Header'
  | 'Avatar'
  | 'ButtonContainer'
  | 'ClearButton'
  | 'SubmitButton'
  | 'FormControlError'
  | 'ErrorMessage'
  | 'GridSpacing';
