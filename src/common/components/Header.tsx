import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useViewport } from '../contexts/ViewportProvider';
import GenericError from './GenericError';
import MobileMenuButton from './MobileMenuButton';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {isAuthenticated, error, loginWithRedirect, logout} = useAuth0();
  const {isMobile} = useViewport();
  let authContent;

  const toggleMobileMenu = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const handleLoginOnClick = () => {
    loginWithRedirect();
  };

  const handleLogOutOnClick = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (error) {
    return (
      <GenericError />
    )
  }

  if (isAuthenticated) {
    authContent = (
      <button
        className="block w-full lg:w-auto text-left lg:text-right text-lg font-semibold"
        onClick={handleLogOutOnClick}
      >
        Log out
      </button>
    );
  } else {
    authContent = (
      <button
        className="block w-full lg:w-auto text-left lg:text-right text-lg font-semibold"
        onClick={handleLoginOnClick}
      >
        Log in
      </button>
    );
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  let mobileLinkStyles = `hidden`;
  let desktopLinkStyles = `inline`;
  let mobileMenuStyles = isMobile ? `inline` : `hidden`;
  let linkStyles =
    isMobile && !isMobileMenuOpen ? mobileLinkStyles : desktopLinkStyles;

  let desktopContainerStyles = `flex items-center py-4`;
  let mobileContainerStyles = `absolute inset-0 flex px-8 py-4 bg-white z-10`;
  let containerStyles = isMobileMenuOpen
    ? mobileContainerStyles
    : desktopContainerStyles;
  let firstMenuLinkStyles = '';

  if (isMobileMenuOpen) {
    linkStyles = 'block mb-3';
    containerStyles = 'absolute inset-0 flex flex-col px-8 py-4 bg-white z-10';
    firstMenuLinkStyles = 'mb-8';
  }

  return (
    <header className="px-8 lg:px-0">
      <nav>
        <ul className={containerStyles}>
          <li className={`lg:mb-0 ${firstMenuLinkStyles}`}>
            <Link
              to="/"
              className="inline"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
            >
              <img
                src="/images/logo-dark.png"
                className="w-48"
                alt="Bear Tracks Logo"
              />
            </Link>
          </li>
          <li
            aria-hidden={true}
            className={isMobileMenuOpen ? '' : 'flex-1'}
          ></li>
          <li className={`${linkStyles}`} onClick={toggleMobileMenu}>
            <Link to="/" className="text-lg font-semibold block">
              Home
            </Link>
          </li>
          <li className={`${linkStyles}`} onClick={toggleMobileMenu}>
            <Link
              to="/favorites"
              className="text-lg font-semibold lg:px-8 block"
            >
              Favorites
            </Link>
          </li>
          <li className={`${linkStyles}`}>{authContent}</li>
          <li className={`${mobileMenuStyles}`}>
            <MobileMenuButton
              onClick={toggleMobileMenu}
              isMobileMenuOpen={isMobileMenuOpen}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
