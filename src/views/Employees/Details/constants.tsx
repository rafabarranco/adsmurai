import { ReactElement } from 'react';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ComputerIcon from '@mui/icons-material/Computer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Departments } from './types';

export const DEPARTMENTS: Record<Departments, ReactElement> = {
  'customer success': <SupportAgentIcon />,
  engineering: <ComputerIcon />,
  finance: <AccountBalanceIcon />,
};
