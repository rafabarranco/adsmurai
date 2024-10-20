import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppRouter from './core/Router/index.tsx';

import '@fontsource/inter';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
