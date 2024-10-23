import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import GoBack from '.';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('GoBack Component', () => {
  it('should render the button and navigate back on click', () => {
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <GoBack />
      </MemoryRouter>,
    );
    const buttonElement = screen.getByRole('button', {
      name: /click here to go back/i,
    });
    expect(buttonElement).toBeTruthy();
    fireEvent.click(buttonElement);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
