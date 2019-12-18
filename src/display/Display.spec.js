// Test away!
import React from 'react';
import {render} from '@testing-library/react';

import Display from './Display';

//gate defaults to unlocked and open
test("defaults to `unlocked` and `open`", () => {
  const mockState = {
    closed: false,
    locked: false
  };
  const { getByText } = render(<Display
      closed = {mockState.closed}
      locked = {mockState.locked}
    />);
  expect(getByText(/unlocked/i)).toBeDefined();
  expect(getByText(/open/i)).toBeDefined();
});

//displays if gate open/closed and locked/unlocked
test("displays if gate is open/closed and if it is locked/unlocked", () => {
  const mockState = {
    locked: true,
    closed: true
  }
  const { getByText } = render(
    <Display
      locked={mockState.locked}
      closed={mockState.closed}
    />
  );
  expect(getByText(mockState.locked ? /locked/i : /unlocked/i)).toBeDefined();
  expect(getByText(mockState.closed ? /closed/i : /open/i)).toBeDefined();
});

//displays closed if closed prop true, otherwise displays open
test("displays 'Closed' if the `closed` prop is `true` and 'Open' if otherwise", () => {
  const mockState = {
    closed: true
  }
  const { getByText } = render(<Display closed={mockState.closed} />);
  expect(getByText(mockState.closed ? /closed/i : /open/i)).toBeDefined();
})

//displays locled if locked prop true, otherwise displays unlocked
test("displays 'Locked' if the `locked` prop is `true` and 'Unlocked' if otherwise", () => {
  const mockState = {
    locked: true
  }
  const { getByText } = render(<Display locked={mockState.locked} />);
  expect(getByText(mockState.locked ? /locked/i : /unlocked/i)).toBeDefined();
})

//when locked/closed use red-led
test("when `locked` or `closed` use the `red-led` class", () => {
  const mockState = {
    locked: true,
    closed: true
  }
  const { getByText } = render(<Display locked={mockState.locked} closed={mockState.closed} />);
  const isLocked = getByText(/locked/i);
  const isClosed = getByText(/closed/i);
  expect(isLocked.classList.contains('red-led')).toBe(true);
  expect(isClosed.classList.contains('red-led')).toBe(true);
});

//when unlocked/open use green-led
test("when `locked` or `closed` use the `red-led` class", () => {
  const mockState = {
    locked: false,
    closed: false
  };
  const { getByText } = render(
    <Display locked={mockState.locked} closed={mockState.closed} />
  );
  const isLocked = getByText(/unlocked/i);
  const isClosed = getByText(/open/i);
  expect(isLocked.classList.contains("green-led")).toBe(true);
  expect(isClosed.classList.contains("green-led")).toBe(true);
});