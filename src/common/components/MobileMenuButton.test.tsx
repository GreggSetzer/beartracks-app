import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenuButton, { MobileMenuButtonProps } from './MobileMenuButton';

describe('MobileMenuButton', () => {
  const setup = (props: Partial<MobileMenuButtonProps> = {}) => {
    const defaultProps: MobileMenuButtonProps = {
      onClick: jest.fn(),
      isMobileMenuOpen: false,
      ...props,
    };
    return render(<MobileMenuButton {...defaultProps} />);
  };

  test('renders without crashing', () => {
    setup();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders "Open main menu" text when menu is closed', () => {
    setup({ isMobileMenuOpen: false });
    expect(screen.getByText('Open main menu')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('inline-flex items-center justify-center rounded-md text-gray-700');
  });

  test('renders "Close main menu" text when menu is open', () => {
    setup({ isMobileMenuOpen: true });
    expect(screen.getByText('Close main menu')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('absolute right-0 top-0 px-8 py-6');
  });

  test('calls onClick handler when button is clicked', () => {
    const onClickMock = jest.fn();
    setup({ onClick: onClickMock });

    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
