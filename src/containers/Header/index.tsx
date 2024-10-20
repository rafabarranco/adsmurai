import { FC, ReactElement } from 'react';

import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';

import styles from './styles';

const Header: FC = (): ReactElement => {
  return (
    <Stack sx={styles.Header}>
      <Grid sx={styles.Side}>
        <Grid>
          <Button variant="plain" sx={styles.Button}>
            Logo
          </Button>
        </Grid>
      </Grid>
      <Grid sx={styles.Side}>Some icons</Grid>
    </Stack>
  );
};

export default Header;
