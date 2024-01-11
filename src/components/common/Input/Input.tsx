import React from 'react';
import styles from './Input.module.css';

interface IProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: IProps) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
