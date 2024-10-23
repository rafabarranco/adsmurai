import { SxProps } from '@mui/system';

import { TStyles } from './types';

const styles: Record<TStyles, SxProps> = {
  Card: {
    maxWidth: 600,
    mx: 'auto',
    p: 3,
  },
  Header: {
    mb: 2,
    textAlign: 'center',
  },
  Avatar: {
    width: 100,
    height: 100,
    mb: 2,
  },
  ButtonContainer: {
    textAlign: 'center',
    mt: 3,
  },
  ClearButton: {
    px: 4,
    mr: 4,
  },
  SubmitButton: {
    px: 4,
  },
  FormControlError: {
    color: 'danger',
  },
  ErrorMessage: {
    color: 'danger',
  },
  GridSpacing: {
    mt: 2,
  },
};

export default styles;
