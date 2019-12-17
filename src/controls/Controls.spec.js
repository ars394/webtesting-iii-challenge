// Test away!
import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import Controls from './Controls';

test('cannot be closed/opened if locked', () => {
  const toggle = jest.fn();
  const { getByText } = render(<Controls locked={true} closed={true} toggle={toggle} />);
  const openGate = getByText(/open gate/i);
  fireEvent.click(openGate);
  expect(toggle).not.toHaveBeenCalled();
});


test('provide buttons to toggle `closed` and `locked` states', () => {
  const { getAllByText } = render(<Controls />);
  const buttons = getAllByText(/gate/i);
  expect(buttons).toBeDefined();
});


test('buttons text changes to reflect state door will be if clicked', () => {
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


test('closed toggle button disabled if gate locked', () => {
  const toggleClosed = jest.fn();
  const { getByText } = render(<Controls
    locked= {true}
    toggleClosed= {toggleClosed}
    />);
  const closedButton = getByText(/close gate/i);
  fireEvent.click(closedButton);
  expect(toggleClosed).not.toHaveBeenCalled();
});

test('locked toggle button disabled if gate open', () => {
  const toggleLocked = jest.fn();
  const { getByText } = render(<Controls
    closed = {false}
    toggleLocked = {toggleLocked}
    />);
  const lockedButton = getByText(/lock gate/i);
  fireEvent.click(lockedButton);
  expect(toggleLocked).not.toHaveBeenCalled();
});