import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductSelector from './ProductSelector';

describe('ProductSelector', () => {
  it('should render electricity and gas options', () => {
    render(<ProductSelector />);

    const electricityButton = screen.getByRole('button', { name: 'Stroom' });
    const gasButton = screen.getByRole('button', { name: 'Stroom en Gas' });

    expect(electricityButton).toBeDefined();
    expect(gasButton).toBeDefined();
  });

  it('should have electricity selected by default', () => {
    render(<ProductSelector />);

    const electricityButton = screen.getByRole('button', { name: 'Stroom' });
    expect(electricityButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should select gas option when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ProductSelector onChange={onChange} />);

    const gasButton = screen.getByRole('button', { name: 'Stroom en Gas' });
    await user.click(gasButton);

    expect(onChange).toHaveBeenCalledWith('electricity-gas');
    expect(gasButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should initialize with provided value prop', () => {
    render(<ProductSelector value="electricity-gas" />);

    const gasButton = screen.getByRole('button', { name: 'Stroom en Gas' });
    // Component uses internal state initialized from value prop
    expect(gasButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should have proper accessibility attributes', () => {
    render(<ProductSelector />);

    const group = screen.getByRole('group', { name: 'Product type selection' });
    expect(group).toBeDefined();

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-pressed');
    });
  });
});
