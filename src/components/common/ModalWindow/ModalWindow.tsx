import React, { ReactNode } from 'react';
import styles from './ModalWindow.module.css';

interface IProps {
  active: boolean;
  setActive: (e: boolean) => void;
  children: ReactNode;
}

const ModalWindow = ({ active, setActive, children }: IProps) => {
  return (
    <div
      className={
        active ? `${styles.modal} ${styles.modal_active}` : styles.modal
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `${styles.modal_content} ${styles.modal_content_active}`
            : styles.modal_content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
