import React from 'react';
import styles from './TitleOfPages.module.css';

interface IProps {
  title?: string;
}

const TitleOfPages = ({ title }: IProps) => {
  return <p className={styles.titleOfPages}>{title}</p>;
};

export default TitleOfPages;
