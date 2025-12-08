import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConsumptionCalculator from './ConsumptionCalculator';

// Mock the selector components to avoid complex dependencies
vi.mock('./HouseTypeSelector', () => ({
  default: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <div data-testid="house-type-selector">
      <button
        data-testid="house-apartment"
        onClick={() => onChange('apartment')}
        aria-selected={value === 'apartment'}
      >
        Apartment
      </button>
      <button
        data-testid="house-townhouse"
        onClick={() => onChange('townhouse')}
        aria-selected={value === 'townhouse'}
      >
        Townhouse
      </button>
    </div>
  )
}));

vi.mock('./ResidentsSelector', () => ({
  default: ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
    <div data-testid="residents-selector">
      {[1, 2, 3, 4, 5].map(num => (
        <button
          key={num}
          data-testid={`residents-${num}`}
          onClick={() => onChange(num)}
          aria-selected={value === num}
        >
          {num} {num === 1 ? 'person' : 'people'}
        </button>
      ))}
    </div>
  )
}));

vi.mock('./ProductSelector', () => ({
  default: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <div data-testid="product-selector">
      <button
        data-testid="product-electric"
        onClick={() => onChange('electric')}
        aria-selected={value === 'electric'}
      >
        Electric
      </button>
      <button
        data-testid="product-electric-gas"
        onClick={() => onChange('electric-and-gas')}
        aria-selected={value === 'electric-and-gas'}
      >
        Electric & Gas
      </button>
    </div>
  )
}));

describe('ConsumptionCalculator Integration Scenarios', () => {
  it('should display correct electricity consumption for apartment + 2 residents + electricity only', () => {
    render(<ConsumptionCalculator />);

    // Make selections: apartment, 2 residents, electricity only
    fireEvent.click(screen.getByTestId('house-apartment'));
    fireEvent.click(screen.getByTestId('residents-2'));
    fireEvent.click(screen.getByTestId('product-electric'));

    expect(screen.getByText('Geschat jaarverbruik:')).toBeInTheDocument();
    expect(screen.queryByText('Stroom:')).toBeInTheDocument();
    expect(screen.queryByText('120 kWh')).toBeInTheDocument();

    expect(screen.queryByText(/Gas:/)).not.toBeInTheDocument();
  });

  it('should display correct consumption for townhouse + 3 residents + electricity and gas', () => {
    render(<ConsumptionCalculator />);

    // Make selections: townhouse, 3 residents, electricity + gas
    fireEvent.click(screen.getByTestId('house-townhouse'));
    fireEvent.click(screen.getByTestId('residents-3'));
    fireEvent.click(screen.getByTestId('product-electric-gas'));

    expect(screen.getByText('Geschat jaarverbruik:')).toBeInTheDocument();
    expect(screen.getByText('Stroom:')).toBeInTheDocument();
    expect(screen.getByText('280 kWh')).toBeInTheDocument();
    expect(screen.getByText('Gas:')).toBeInTheDocument();
    expect(screen.getByText('56 m³')).toBeInTheDocument();
  });

  it('should reduce electricity consumption when solar panels are enabled', () => {
    render(<ConsumptionCalculator />);

    // Make selections: apartment, 1 resident, electricity only
    fireEvent.click(screen.getByTestId('house-apartment'));
    fireEvent.click(screen.getByTestId('residents-1'));
    fireEvent.click(screen.getByTestId('product-electric'));

    expect(screen.getByText('Stroom:')).toBeInTheDocument();
    expect(screen.getByText('100 kWh')).toBeInTheDocument();

    const solarCheckbox = screen.getByRole('checkbox', { name: /Zonnepanelen/ });
    fireEvent.click(solarCheckbox);
    expect(screen.getByText('Stroom:')).toBeInTheDocument();
    expect(screen.getByText('70 kWh')).toBeInTheDocument();
  });
});
