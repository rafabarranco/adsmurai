import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppRouter from './core/Router';

import '@fontsource/inter';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
