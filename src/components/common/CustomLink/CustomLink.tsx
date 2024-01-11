import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomLink.module.css';

interface IProps {
  to: string;
  text: string;
  openMenu: boolean;
  onClick: () => void;
}

const CustomLink = ({ to, text, openMenu, onClick }: IProps) => {
  return (
    <Link className={styles.customLink} to={to} onClick={onClick}>
      <p
        className={
          openMenu
            ? `${styles.customLink_text} ${styles.customLink_text_active}`
            : styles.customLink_text
        }
      >
        {text}
      </p>
    </Link>
  );
};

export default CustomLink;
