import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import Header from '../Header';
import Footer from '../Footer';

import styles from './styles';

const Layout: FC = (): ReactElement => (
  <Box>
    <Stack sx={styles.Layout}>
      <Stack sx={styles.Header}>
        <Header />
      </Stack>
      <Stack sx={styles.Main}>
        <Outlet />
      </Stack>
      <Stack sx={styles.Footer}>
        <Footer />
      </Stack>
    </Stack>
  </Box>
);

export default Layout;
