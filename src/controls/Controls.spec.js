// Test away!
import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import Controls from './Controls';

//toggle closed and locked states
test('cannot be closed or opened if locked', () => {
  const toggle = jest.fn();
  const { getByText } = render(<Controls locked={true} closed={true} toggle={toggle} />);
  const openGate = getByText(/open gate/i);
  fireEvent.click(openGate);
  expect(toggle).not.toHaveBeenCalled();
  
});

test('provide buttons to toggle the `closed` and `locked` states', () => {
  const { getAllByText } = render(<Controls />);
  const buttons = getAllByText(/gate/i);
  expect(buttons).toBeDefined();
});

// button text changes to reflect the state the door will be in if clicked
test('buttons text changes to reflect the state the door will be in if clicked', () => {
  let mockState = {
    locked: false,
    closed: false
  }
  const toggleClosed = jest.fn();
  const toggleLocked = jest.fn();
  const { getAllByText } = render(<Controls
    locked= {mockState.locked}
    toggleLocked= {toggleLocked}
    closed={mockState.closed}
    toggleClosed= {toggleClosed}
    />);
  const [toggleLock, toggleClose] = getAllByText(/gate/i);
  fireEvent.click(toggleClose);
  expect(toggleClosed).toHaveBeenCalled();
  expect(toggleClose.textContent).toBe("Close Gate");
  expect(toggleLock.textContent).toBe("Lock Gate");
});

//closed toggle button disabled if gate locked
test('the closed toggle button is disabled if the gate is locked', () => {
  const toggleClosed = jest.fn();
  const { getByText } = render(<Controls
    locked= {true}
    toggleClosed= {toggleClosed}
    />);
  const closedButton = getByText(/close gate/i);
  fireEvent.click(closedButton);
  expect(toggleClosed).not.toHaveBeenCalled();
});

//locked toggle button disabled if gate open
test('the locked toggle button is disabled if the gate is open', () => {
  const toggleLocked = jest.fn();
  const { getByText } = render(<Controls
    closed = {false}
    toggleLocked = {toggleLocked}
    />);
  const lockedButton = getByText(/lock gate/i);
  fireEvent.click(lockedButton);
  expect(toggleLocked).not.toHaveBeenCalled();
});