import { SxProps } from '@mui/joy/styles/types';

type TStyles = 'TableHeader' | 'TableRow';

const styles: Record<TStyles, SxProps> = {
  TableHeader: { padding: 2 },
  TableRow: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#e5e5e5',
    },
  },
};

export default styles;
