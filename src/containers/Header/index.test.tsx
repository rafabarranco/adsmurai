import { render, screen } from '@testing-library/react';
import Header from '.';
import '@testing-library/jest-dom/extend-expect';
import { describe, expect, test } from 'vitest';

describe('Header Component', () => {
  test('should render Logo button and icons', () => {
    render(<Header />);

    expect(screen.getByRole('button', { name: /logo/i })).toBeInTheDocument();

    expect(screen.getByText(/some icons/i)).toBeInTheDocument();
  });
});
