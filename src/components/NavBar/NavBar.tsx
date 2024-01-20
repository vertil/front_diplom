import React, { useState } from 'react';
import styles from './NavBar.module.css';
import BurgerButton from '../common/BurgerButton/BurgerButton';
import CustomLink from '../common/CustomLink/CustomLink';

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(true);

  return (
    <nav
      className={
        openMenu ? styles.navBar : `${styles.navBar} ${styles.navBar_close}`
      }
    >
      <div className={styles.navBar_container}>
        <div
          className={
            openMenu
              ? styles.navBar_links
              : `${styles.navBar_links} ${styles.navBar_close}`
          }
        >
          <BurgerButton onClick={() => setOpenMenu(!openMenu)} />

          <CustomLink
            text='Работники'
            to='/personal-info'
            openMenu={openMenu}
            onClick={() => {}}
          />

          <CustomLink
            text='Посещения'
            to='/in-out-status'
            openMenu={openMenu}
            onClick={() => {}}
          />

          <CustomLink
            text='Помещения'
            to='/cabinets-status'
            openMenu={openMenu}
            onClick={() => {}}
          />

          <CustomLink
            text='Камеры'
            to='/camera-status'
            openMenu={openMenu}
            onClick={() => {}}
          />

          <CustomLink
            text='Отделы'
            to='/departments'
            openMenu={openMenu}
            onClick={() => {}}
          />

          <CustomLink
            text='Неопознанные лица'
            to='/unidentified-faces'
            openMenu={openMenu}
            onClick={() => {}}
          />

          <CustomLink
            text='Отчёты'
            to='/filter'
            openMenu={openMenu}
            onClick={() => {}}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
