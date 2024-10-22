import { render, screen } from '@testing-library/react';
import Footer from '.';
import { describe, expect, test } from 'vitest';

describe('Footer Component', () => {
  test('should render the footer content', () => {
    render(<Footer />);

    expect(
      screen.getByText(
        /© 2024 Adsmurai Innovative Marketing Tool. All Rights Reserved./i,
      ),
    ).toBeTruthy();
  });
});
