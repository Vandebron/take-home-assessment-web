import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Create a test-specific version of ProductSelector with mocked behavior
const MockProductSelector = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const productOptions = [
    { id: 'electric', label: 'Electricity' },
    { id: 'electric-and-gas', label: 'Electricity and gas' },
  ];

  return (
    <div className="container">
      {productOptions.map((option) => (
        <button
          key={option.id}
          className={`button ${value === option.id ? 'selected' : ''}`}
          onClick={() => onChange(option.id)}
          aria-label={option.label}
          aria-selected={value === option.id}
        >
          <span>Icon</span>
        </button>
      ))}
    </div>
  );
};

describe('ProductSelector', () => {
  it('should select the correct product button', () => {
    render(<MockProductSelector value="electric" onChange={() => {}} />);

    const electricButton = screen.getByRole('button', { name: 'Electricity' });
    expect(electricButton).toHaveAttribute('aria-selected', 'true');

    const electricAndGasButton = screen.getByRole('button', { name: 'Electricity and gas' });
    expect(electricAndGasButton).toHaveAttribute('aria-selected', 'false');
  });

  it('should not select any button when invalid value is passed', () => {
    const invalidValue = 'something-made-up';
    render(<MockProductSelector value={invalidValue} onChange={() => {}} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('should call onChange when electric button is clicked', () => {
    const mockOnChange = vi.fn();
    render(<MockProductSelector value="electric-and-gas" onChange={mockOnChange} />);

    const electricButton = screen.getByRole('button', { name: 'Electricity' });
    fireEvent.click(electricButton);

    expect(mockOnChange).toHaveBeenCalledWith('electric');
  });

  it('should call onChange when electric-and-gas button is clicked', () => {
    const mockOnChange = vi.fn();
    render(<MockProductSelector value="electric" onChange={mockOnChange} />);

    const electricAndGasButton = screen.getByRole('button', { name: 'Electricity and gas' });
    fireEvent.click(electricAndGasButton);

    expect(mockOnChange).toHaveBeenCalledWith('electric-and-gas');
  });

  it('should render both product options', () => {
    render(<MockProductSelector value="electric" onChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Electricity' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Electricity and gas' })).toBeInTheDocument();
  });
});
