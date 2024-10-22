import { SxProps } from '@mui/joy/styles/types';

const styles: Record<string, SxProps> = {
  Layout: {
    display: 'grid',
    gridTemplateColumns: ' 1fr',
    gridTemplateRows: 'auto 1fr auto',
    gridTemplateAreas: "'header' 'main' 'footer'",
  },
  Header: {
    gridArea: 'header',
    position: 'sticky',
    zIndex: 2,
    top: 0,
    left: 0,
  },
  Main: {
    gridArea: 'main',
    padding: '24px',
    minWidth: '70px',
  },
  Footer: {
    gridArea: 'footer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70px',
  },
};

export default styles;
