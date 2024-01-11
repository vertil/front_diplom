import React, { ReactNode } from 'react';
import styles from './Table.module.css';
import TitleOfPages from '../TitleOfPages/TitleOfPages';

interface IProps {
  tableName?: string;
  theadName: string[];
  children: ReactNode;
}

const Table = ({ tableName, theadName, children }: IProps) => {
  return (
    <>
      <TitleOfPages title={tableName} />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {theadName.map((th, index) => {
              return <th key={index}>{th}</th>;
            })}
          </tr>
        </thead>

        <tbody className={styles.tbody}>{children}</tbody>
      </table>
    </>
  );
};

export default Table;
