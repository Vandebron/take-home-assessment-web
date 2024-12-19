import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HouseTypeSelector from './HouseTypeSelector';
import React from 'react';

const mockMatchData = { id: '', pathname: '', params: {} };
const mockSearchParams = new URLSearchParams();

describe('HouseTypeSelector', () => {
  it('what to do with made up things?', () => {
    const houseType = 'i-made-this-up';
    render(<HouseTypeSelector value={houseType} onChange={() => {}} />);


    // Find the button you want to interact with
    const button = screen.getByRole('button', { name: 'apartment' });

    // Check if the button is selected
    expect(button).toHaveAttribute('aria-selected', 'true');
  });
});
