import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HouseTypeSelector from './HouseTypeSelector';

describe('HouseTypeSelector', () => {
  it('what to do with made up things?', async () => {
    const houseType = 'something-made-up';
    render(<HouseTypeSelector value={houseType} onChange={() => {}} />);

    // Find the button you want to interact with
    const button = await screen.findByRole('button', { name: 'apartment' });

    // Check if the button is selected
    expect(button).toHaveAttribute('aria-selected', 'true')
  });
});
