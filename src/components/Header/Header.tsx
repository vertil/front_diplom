import React, { useState } from 'react';
import $api from '../../http';
import styles from './Header.module.css';
import Button from '../common/Button/Button';
import ModalWindow from '../common/ModalWindow/ModalWindow';
import LoginForm from '../LoginForm/LoginForm';

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [modalWindowLogin, setModalWindowLogin] = useState<boolean>(false);

  const EnterIn = async () => {
    if (isLogin === false) {
      setModalWindowLogin(true);
    } else {
      try {
        await $api.post('/auth/logout');
        localStorage.removeItem('token');
        setIsLogin(false);
        console.log('logout');
      } catch (error) {
        console.log('logoutError', error);
      }
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <Button text={isLogin ? 'Выйти' : 'Войти'} onClick={EnterIn} />
      </div>

      <ModalWindow
        active={modalWindowLogin}
        setActive={() => setModalWindowLogin(!modalWindowLogin)}
      >
        <LoginForm
          setIsLogin={setIsLogin}
          setModalWindowLogin={setModalWindowLogin}
        />
      </ModalWindow>
    </div>
  );
};

export default Header;
