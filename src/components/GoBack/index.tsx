import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/joy/Button';

import { IGoBackProps } from './types';

const GoBack: FC<IGoBackProps> = ({ styles }): ReactElement => {
  const navigate = useNavigate();
  return (
    <Button sx={styles} onClick={() => navigate(-1)}>
      Click here to go back
    </Button>
  );
};

export default GoBack;
