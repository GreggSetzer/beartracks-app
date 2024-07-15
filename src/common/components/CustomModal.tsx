import { ReactNode } from 'react';
import Modal from 'react-responsive-modal';
import styles from './CustomModal.module.css';

export interface CustomModalProps {
  onClose: () => void;
  children: ReactNode;
}
const CustomModal = ({ onClose, children }: CustomModalProps) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      center
      showCloseIcon={false}
      classNames={{
        modal: styles.customModal,
        overlay: styles.customOverlay,
      }}
    >
      {children}
      <div className="py-3 border-t-2 border-gray-700 text-center">
        <button
          className="px-4 py-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
