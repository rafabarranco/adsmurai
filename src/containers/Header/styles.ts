import { SxProps } from '@mui/joy/styles/types';

import { TStyles } from './types';

const styles: Record<TStyles, SxProps> = {
  Header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2e2e2e',
    color: '#fff',
    padding: '24px 28px',
  },
  Side: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '12px',
  },
  Button: {
    color: '#fff',
    ':hover': { backgroundColor: 'transparent', color: '#fff' },
  },
};

export default styles;
