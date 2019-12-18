// Test away
import React from 'react';
import {render} from '@testing-library/react';

import Dashboard from './Dashboard';

//show controls and display
test('Dashboard shows all', () => {
  const { getByText } = render(<Dashboard />);
  getByText(/Unlocked/i);
  const display = getByText(/Open/i);
  getByText(/Lock Gate/i);
  const controls = getByText(/Close Gate/i);

  expect(display).toBeDefined;
  expect(controls).toBeDefined;  
});