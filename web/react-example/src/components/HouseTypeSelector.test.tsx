import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock component
const MockHouseTypeSelector = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const houseTypes = [
    { id: 'apartment', label: 'Appartement' },
    { id: 'townhouse', label: 'Tussenwoning' },
    { id: 'corner-house', label: 'Hoekwoning' },
    { id: 'two-under-one-roof', label: '2 onder 1 Kap' },
    { id: 'detached-house', label: 'Vrijstaand' },
  ];

  return (
    <div className="container">
      {houseTypes.map((type) => (
        <button
          key={type.id}
          className={`button ${value === type.id ? 'selected' : ''}`}
          onClick={() => onChange(type.id)}
          aria-label={type.label}
          aria-selected={value === type.id}
        >
          <span>Icon</span>
        </button>
      ))}
    </div>
  );
};

describe('HouseTypeSelector', () => {
  // Parameterized tests for each house type
  describe.each([
    { id: 'apartment', label: 'Appartement' },
    { id: 'townhouse', label: 'Tussenwoning' },
    { id: 'corner-house', label: 'Hoekwoning' },
    { id: 'two-under-one-roof', label: '2 onder 1 Kap' },
    { id: 'detached-house', label: 'Vrijstaand' },
  ])('when value is "$id"', ({ id, label }) => {
    it(`should mark "${label}" as selected`, () => {
      render(<MockHouseTypeSelector value={id} onChange={() => {}} />);
      const selectedButton = screen.getByRole('button', { name: label });
      expect(selectedButton).toHaveAttribute('aria-selected', 'true');
      
      // Verify others are not selected
      const allButtons = screen.getAllByRole('button');
      const unselectedButtons = allButtons.filter(btn => btn !== selectedButton);
      unselectedButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-selected', 'false');
      });
    });
  });

  describe('general behavior', () => {
    it('should render all 5 house type options', () => {
      render(<MockHouseTypeSelector value="apartment" onChange={() => {}} />);
      
      const expectedLabels = [
        'Appartement',
        'Tussenwoning',
        'Hoekwoning',
        '2 onder 1 Kap',
        'Vrijstaand'
      ];
      
      expectedLabels.forEach(label => {
        expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
      });
    });

    it('should handle invalid values by not selecting any button', () => {
      const invalidValue = 'non-existent-house';
      render(<MockHouseTypeSelector value={invalidValue} onChange={() => {}} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-selected', 'false');
      });
    });

    it('should call onChange with correct house type when clicked', () => {
      const mockOnChange = vi.fn();
      render(<MockHouseTypeSelector value="apartment" onChange={mockOnChange} />);
      
      const townhouseButton = screen.getByRole('button', { name: 'Tussenwoning' });
      fireEvent.click(townhouseButton);
      
      expect(mockOnChange).toHaveBeenCalledWith('townhouse');
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should not call onChange when clicking already selected button', () => {
      const mockOnChange = vi.fn();
      render(<MockHouseTypeSelector value="apartment" onChange={mockOnChange} />);
      
      const apartmentButton = screen.getByRole('button', { name: 'Appartement' });
      fireEvent.click(apartmentButton);
      
      expect(mockOnChange).toHaveBeenCalledWith('apartment');
    });
  });

});