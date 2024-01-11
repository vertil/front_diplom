import React, { MouseEvent } from 'react';
import styles from './Button.module.css';

interface IProps {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick }: IProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
