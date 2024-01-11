import React from 'react';
import styles from './BurgerButton.module.css';

interface IProps {
  onClick: () => void;
}

const BurgerButton = ({ onClick }: IProps) => {
  return (
    <div className={styles.burgerButton} onClick={onClick}>
      <span />
    </div>
  );
};

export default BurgerButton;
