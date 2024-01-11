import React, { ReactNode } from 'react';
import styles from './Main.module.css';

interface IProps {
  children: ReactNode;
}

const Main = ({ children }: IProps) => {
  return <div className={styles.main}>{children}</div>;
};

export default Main;
