import { Button } from '@/shared/component';
import styles from './logoutModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps): ReactNode {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Confirm Logout</h2>
        <p className={styles.modalText}>Are you sure you want to log out?</p>
        <div className={styles.modalButtons}>
          <Button variant="primary" className={styles.confirmButton} onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="secondary" className={styles.cancelButton} onClick={onClose}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
}
