import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './core/Router/index';
import { describe, expect, test } from 'vitest';

describe('Root Component', () => {
  test('renders AppRouter without crashing', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);

    root.render(
      <StrictMode>
        <AppRouter />
      </StrictMode>,
    );

    expect(container).toBeTruthy();

    root.unmount();
    container.remove();
  });
});
