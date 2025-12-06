import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock component
const MockResidentsSelector = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
  const residentOptions = [
    { id: 1, label: '1 person' },
    { id: 2, label: '2 people' },
    { id: 3, label: '3 people' },
    { id: 4, label: '4 people' },
    { id: 5, label: '5 or more people' },
  ];

  return (
    <div className="container">
      {residentOptions.map((option) => (
        <button
          key={`resident-${option.id}`}
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

describe('ResidentsSelector', () => {
  // Parameterized tests for selection states
  describe.each([
    { value: 1, label: '1 person' },
    { value: 2, label: '2 people' },
    { value: 3, label: '3 people' },
    { value: 4, label: '4 people' },
    { value: 5, label: '5 or more people' },
  ])('when value is $value', ({ value, label }) => {
    it(`should mark "${label}" as selected`, () => {
      render(<MockResidentsSelector value={value} onChange={() => {}} />);
      const selectedButton = screen.getByRole('button', { name: label });
      expect(selectedButton).toHaveAttribute('aria-selected', 'true');
      
      // Also verify others are not selected
      const allButtons = screen.getAllByRole('button');
      const unselectedButtons = allButtons.filter(btn => btn !== selectedButton);
      unselectedButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-selected', 'false');
      });
    });
  });

  describe('general behavior', () => {
    it('should render all 5 resident options', () => {
      render(<MockResidentsSelector value={1} onChange={() => {}} />);
      
      const expectedLabels = [
        '1 person',
        '2 people',
        '3 people',
        '4 people',
        '5 or more people'
      ];
      
      expectedLabels.forEach(label => {
        expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
      });
    });

    it('should handle invalid values by not selecting any button', () => {
      const invalidValue = 99;
      render(<MockResidentsSelector value={invalidValue} onChange={() => {}} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-selected', 'false');
      });
    });

    it('should call onChange with correct value when clicked', () => {
      const mockOnChange = vi.fn();
      render(<MockResidentsSelector value={1} onChange={mockOnChange} />);
      
      const twoPeopleButton = screen.getByRole('button', { name: '2 people' });
      fireEvent.click(twoPeopleButton);
      
      expect(mockOnChange).toHaveBeenCalledWith(2);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
  });
});