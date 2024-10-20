import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Employee from './Employees.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Employee />
  </StrictMode>,
);
