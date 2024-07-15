import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useAuth0 } from '@auth0/auth0-react';
import { useViewport } from '../contexts/ViewportProvider';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { MobileMenuButtonProps } from './MobileMenuButton';

jest.mock('@auth0/auth0-react');
const mockUseAuth0 = useAuth0 as jest.Mock;

jest.mock('../contexts/ViewportProvider');
const mockUseViewport = useViewport as jest.Mock;

jest.mock('./MobileMenuButton', () => ({ onClick, isMobileMenuOpen }: MobileMenuButtonProps) => (
  <button onClick={onClick}>
    {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
  </button>
));

describe('Header component', () => {
  const setup = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    mockUseAuth0.mockReturnValue({
      isAuthenticated: false,
      error: null,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
    });
  });

  describe('general behavior', () => {
    beforeEach(() => {
      mockUseViewport.mockReturnValue({ isMobile: false });

      setup();
    });

    test('renders without crashing', () => {
      expect(screen.getByAltText('Bear Tracks Logo')).toBeInTheDocument();
    });

    test('renders login button when not authenticated', () => {
      expect(screen.getByText('Log in')).toBeInTheDocument();
    });

    test('renders logout button when authenticated', () => {
      mockUseAuth0.mockReturnValue({
        isAuthenticated: true,
        error: null,
        loginWithRedirect: jest.fn(),
        logout: jest.fn(),
      });

      setup();
      expect(screen.getByText('Log out')).toBeInTheDocument();
    });

    test('calls logout on logout button click', () => {
      const logoutMock = jest.fn();
      mockUseAuth0.mockReturnValue({
        isAuthenticated: true,
        error: null,
        loginWithRedirect: jest.fn(),
        logout: logoutMock,
      });

      setup();
      fireEvent.click(screen.getByText('Log out'));
      expect(logoutMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Auth0 Callbacks', () => {
    beforeEach(() => {
      mockUseViewport.mockReturnValue({ isMobile: false });
    });

    test('calls loginWithRedirect on login button click', () => {
      const loginWithRedirectMock = jest.fn();
      mockUseAuth0.mockReturnValue({
        isAuthenticated: false,
        error: null,
        loginWithRedirect: loginWithRedirectMock,
        logout: jest.fn(),
      });

      setup();
      fireEvent.click(screen.getByText('Log in'));
      expect(loginWithRedirectMock).toHaveBeenCalledTimes(1);
    });

    test('renders GenericError component on Auth0 error', () => {
      const errorMessage = 'Auth0 error message';
      mockUseAuth0.mockReturnValue({
        isAuthenticated: false,
        error: new Error(errorMessage),
        loginWithRedirect: jest.fn(),
        logout: jest.fn(),
      });

      setup();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText("Sorry, we've encountered an error.")).toBeInTheDocument();
      expect(screen.getByText('Go back to Home')).toBeInTheDocument();
    });
  });

  describe('mobile experience', () => {
    beforeEach(() => {
      mockUseViewport.mockReturnValue({ isMobile: true });

      setup();
    });

    test('toggles mobile menu', () => {
      const openMenuButton = screen.getByRole('button', { name: /open main menu/i });
      expect(openMenuButton).toBeInTheDocument();
      fireEvent.click(openMenuButton);

      const closeButton = screen.getByRole('button', { name: /close main menu/i });
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);
      expect(screen.queryByRole('button', { name: /close main menu/i })).not.toBeInTheDocument();
    });

    test('applies correct styles for mobile menu', () => {
      fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));

      const homeLinkParent = screen.getByText('Home').closest('li');
      const favoritesLinkParent = screen.getByText('Favorites').closest('li');

      expect(homeLinkParent).toHaveClass('block mb-3');
      expect(favoritesLinkParent).toHaveClass('block mb-3');
    });

    test('body overflow is hidden when mobile menu is open', () => {
      fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));
      expect(document.body.style.overflow).toBe('hidden');

      fireEvent.click(screen.getByRole('button', { name: /close main menu/i }));
      expect(document.body.style.overflow).toBe('auto');
    });

    test('closes mobile menu when "Home" link is clicked', () => {
      // Open the mobile menu
      fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));

      // Click on the "Home" link
      fireEvent.click(screen.getByText('Home'));

      // Check if the mobile menu is closed
      expect(screen.queryByRole('button', { name: /close main menu/i })).not.toBeInTheDocument();

      // Check if body overflow is reset to auto
      expect(document.body.style.overflow).toBe('auto');
    });

    test('closes mobile menu when logo link is clicked', () => {
      // Open the mobile menu
      fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));

      // Click on the logo link
      fireEvent.click(screen.getByAltText('Bear Tracks Logo'));

      // Check if the mobile menu is closed
      expect(screen.queryByRole('button', { name: /close main menu/i })).not.toBeInTheDocument();

      // Check if body overflow is reset to auto
      expect(document.body.style.overflow).toBe('auto');
    });
  });

  describe('desktop experience', () => {
    beforeEach(() => {
      mockUseViewport.mockReturnValue({ isMobile: false });

      setup();
    });

    test('renders links with inline styles', () => {
      const homeLinkParent = screen.getByText('Home').closest('li');
      const favoritesLinkParent = screen.getByText('Favorites').closest('li');

      expect(homeLinkParent).toHaveClass('inline');
      expect(favoritesLinkParent).toHaveClass('inline');
    });

    test('does not apply body overflow hidden when menu is open', () => {
      fireEvent.click(screen.getByRole('button', { name: /open main menu/i }));
      expect(document.body.style.overflow).toBe('auto');
    });
  });
});
