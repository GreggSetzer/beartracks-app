import { MdClose, MdMenu } from 'react-icons/md';

export interface MobileMenuButtonProps {
  onClick: () => void;
  isMobileMenuOpen: boolean;
}

const MobileMenuButton = ({ onClick, isMobileMenuOpen}: MobileMenuButtonProps) => {
  let closeButtonStyles = isMobileMenuOpen ? 'pt-3' : '';
  let mobileMenuButton = (
    <>
      <span className="sr-only">Open main menu</span>
      <MdMenu className="text-3xl"/>
    </>
  );

  if (isMobileMenuOpen) {
    closeButtonStyles = 'absolute right-0 top-0 px-8 py-6';

    mobileMenuButton = (
      <>
        <span className="sr-only">Close main menu</span>
        <MdClose className="text-3xl"/>
      </>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${closeButtonStyles} inline-flex items-center justify-center rounded-md text-gray-700`}
    >
      {mobileMenuButton}
    </button>
  )
}

export default MobileMenuButton;