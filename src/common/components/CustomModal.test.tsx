import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomModal, { CustomModalProps } from './CustomModal';
import styles from '../../features/map/components/MapCard.module.css';

describe('CustomModal', () => {
  const setup = (props: Partial<CustomModalProps> = {}) => {
    const defaultProps: CustomModalProps = {
      onClose: jest.fn(),
      children: <div data-testid="modal-content">Modal Content</div>,
      ...props,
    };

    return render(
      <CustomModal onClose={defaultProps.onClose}>
        {defaultProps.children}
      </CustomModal>
    );
  };

  test('should render the modal and its children content', () => {
    setup();

    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toBeInTheDocument();

    const contentElement = screen.getByTestId('modal-content');
    expect(contentElement).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    setup({ onClose: onCloseMock });

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('should call onClose when modal close event is triggered', () => {
    const onCloseMock = jest.fn();
    setup({ onClose: onCloseMock });

    // Simulate the modal being closed by triggering the close event on the Modal component
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('should apply custom class names', () => {
    setup();

    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toHaveClass(styles.customModal);

    const overlayElement = document.querySelector(`.${styles.customOverlay}`);
    expect(overlayElement).toBeInTheDocument();
    expect(overlayElement).toHaveClass(styles.customOverlay);
  });

  test('should be accessible', () => {
    setup();

    const modalElement = screen.getByRole('dialog');
    expect(modalElement).toHaveAttribute('aria-modal', 'true');
  });
});
