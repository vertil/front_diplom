import React, { useState, useCallback, ChangeEvent, MouseEvent } from 'react';
import $api from '../../http';
import { AuthResponse } from '../../models/response/AuthResponse';
import { validationService } from '../../services/validation';
import styles from './LoginForm.module.css';
import TitleOfPages from '../common/TitleOfPages/TitleOfPages';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

interface ILoginForm {
  setIsLogin: (e: boolean) => void;
  setModalWindowLogin: (e: boolean) => void;
}

const LoginForm = ({ setIsLogin, setModalWindowLogin }: ILoginForm) => {
  const [username, setUsername] = useState<string>('admin'); // ''
  const [password, setPassword] = useState<string>('97Lp82Eq'); // ''
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const onChangeUsername = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setUsername(value);
      const error = validationService.validateName(value);
      setErrors((errors) => ({ ...errors, username: error }));
    },
    []
  );

  const onChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setPassword(value);
      const error = validationService.validatePassword(value);
      setErrors((errors) => ({ ...errors, password: error }));
    },
    []
  );

  const login = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const errors = {
        username: validationService.validateName(username),
        password: validationService.validatePassword(password),
      };
      setErrors(errors);

      if (errors.username === '' && errors.password === '') {
        try {
          const response = await $api.post<AuthResponse>('/auth/sign-in', {
            username,
            password,
          });
          localStorage.setItem('token', response.data.access_token);
          setIsLogin(true);
          setModalWindowLogin(false);
          console.log('login');
        } catch (error) {
          console.log('loginError', error);
        }
      }
    } catch {
      console.log('loginValidationError');
    }
  };

  return (
    <>
      <TitleOfPages title='Sign in' />
      <form className={styles.loginForm}>
        <div className={styles.loginForm_input}>
          <Input
            label='Username'
            type='text'
            placeholder='Enter username...'
            value={username}
            onChange={onChangeUsername}
            error={errors.username}
          />

          <Input
            label='Password'
            type='password'
            placeholder='Enter password...'
            value={password}
            onChange={onChangePassword}
            error={errors.password}
          />
        </div>

        <Button text='Login' onClick={login} />
      </form>
    </>
  );
};

export default LoginForm;
