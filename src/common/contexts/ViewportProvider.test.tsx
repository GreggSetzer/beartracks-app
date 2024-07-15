import React from 'react';
import { render, act } from '@testing-library/react';
import { ViewportProvider, useViewport } from './ViewportProvider';

jest.mock('../utils', () => ({
  throttle: (fn: any) => fn,
}));

describe('ViewportProvider', () => {
  const TestComponent = () => {
    const { isMobile } = useViewport();
    return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
  };

  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  const setup = () => {
    return render(
      <ViewportProvider>
        <TestComponent />
      </ViewportProvider>
    );
  }

  test('provides initial value based on window width', () => {
    setWindowWidth(500);
    const { unmount, getByText } = setup();
    expect(getByText('Mobile')).toBeInTheDocument();
    unmount();

    // Set the window width to a desktop size
    setWindowWidth(1200);
    const { getByText: getByText2 } = setup();
    expect(getByText2('Desktop')).toBeInTheDocument();
  });

  test('updates value on window resize', () => {
    const { getByText } = setup();

    expect(getByText('Desktop')).toBeInTheDocument();

    // Resize window to mobile size
    act(() => {
      setWindowWidth(500);
    });
    expect(getByText('Mobile')).toBeInTheDocument();

    // Resize window to desktop size
    act(() => {
      setWindowWidth(1200);
    });
    expect(getByText('Desktop')).toBeInTheDocument();
  });
});
