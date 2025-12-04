import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResidentsSelector from './ResidentsSelector';

describe('ResidentsSelector', () => {
  it('should render 5 resident options (1-5)', () => {
    render(<ResidentsSelector value={1} onChange={() => {}} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('should have correct aria-labels for each option', () => {
    render(<ResidentsSelector value={1} onChange={() => {}} />);

    expect(screen.getByRole('button', { name: '1 resident' })).toBeDefined();
    expect(screen.getByRole('button', { name: '2 residents' })).toBeDefined();
    expect(screen.getByRole('button', { name: '3 residents' })).toBeDefined();
    expect(screen.getByRole('button', { name: '4 residents' })).toBeDefined();
    expect(screen.getByRole('button', { name: '5 residents' })).toBeDefined();
  });

  it('should mark the selected value as pressed', () => {
    render(<ResidentsSelector value={3} onChange={() => {}} />);

    const button3 = screen.getByRole('button', { name: '3 residents' });
    expect(button3).toHaveAttribute('aria-pressed', 'true');
  });

  it('should call onChange with correct value when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ResidentsSelector value={1} onChange={onChange} />);

    const button4 = screen.getByRole('button', { name: '4 residents' });
    await user.click(button4);

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('should only have one option pressed at a time', () => {
    render(<ResidentsSelector value={2} onChange={() => {}} />);

    const buttons = screen.getAllByRole('button');
    const pressedButtons = buttons.filter((btn) => btn.getAttribute('aria-pressed') === 'true');

    expect(pressedButtons).toHaveLength(1);
    expect(pressedButtons[0]).toHaveAttribute('aria-label', '2 residents');
  });

  it('should have proper accessibility attributes', () => {
    render(<ResidentsSelector value={1} onChange={() => {}} />);

    const group = screen.getByRole('group', { name: 'Number of residents selection' });
    expect(group).toBeDefined();

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-pressed');
    });
  });

  it('should handle clicks on all buttons correctly', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<ResidentsSelector value={1} onChange={onChange} />);

    for (let i = 1; i <= 5; i++) {
      const button = screen.getByRole('button', { name: `${i} resident${i > 1 ? 's' : ''}` });
      await user.click(button);
      expect(onChange).toHaveBeenCalledWith(i);
    }

    expect(onChange).toHaveBeenCalledTimes(5);
  });
});
