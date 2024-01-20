import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import Main from '../Main/Main';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <NavBar />
        <Main>
          <Outlet />
        </Main>
      </div>
    </>
  );
};

export default Layout;
