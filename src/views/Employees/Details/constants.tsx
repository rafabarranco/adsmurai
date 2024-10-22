import { ReactElement } from 'react';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ComputerIcon from '@mui/icons-material/Computer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import { TDepartments } from './types';

export const DEPARTMENTS_ICONS: Record<TDepartments, ReactElement> = {
  'customer success': <SupportAgentIcon />,
  engineering: <ComputerIcon />,
  finance: <AccountBalanceIcon />,
};
