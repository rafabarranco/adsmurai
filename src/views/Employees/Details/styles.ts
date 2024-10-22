import { SxProps } from '@mui/joy/styles/types';
import { TStyles } from './types';

const styles: Record<TStyles, SxProps> = {
  Card: {
    flexWrap: 'wrap',
    overflow: 'auto',
  },
  CardContent: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  Picture: {
    maxHeight: 300,
    minWidth: 300,
  },
  Info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Name: { fontSize: 'xl', fontWeight: 'lg' },
  Id: { fontVariant: 'plain', fontStyle: 'italic' },
  Email: { fontWeight: 'lg' },
  Sheet: {
    bgcolor: 'background.level1',
    borderRadius: 'sm',
    p: 1.5,
    my: 1.5,
    display: 'flex',
    gap: 2,
    '& > div': { flex: 1 },
  },
  DepartmentLabel: { fontWeight: 'lg' },
  DepartmentValue: {
    fontWeight: 'lg',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  RoleLabel: { fontWeight: 'lg' },
  RoleValue: { fontWeight: 'lg' },
  SalaryLabel: { fontWeight: 'lg' },
  SalaryValue: { fontWeight: 'lg' },
  HireInfo: { display: 'flex', gap: 1.5, '& > button': { flex: 1 } },
  HireDate: { pointerEvents: 'none' },
  DismissalDate: { pointerEvents: 'none' },
};

export default styles;
