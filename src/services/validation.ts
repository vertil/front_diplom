export const REQUIRED_FIELD = 'Заполните обязательные поля';
const WRONG_NAME_SHORT = 'Имя должно быть не мение 3 символов';
const WRONG_NAME_LONG = 'Имя должно быть не больше 10 символов';
const ENTER_PASSWORD = 'Введите пароль';
const WRONG_PASSWORD_SHORT = 'Пароль должен содержать не менее 8 символов';
const WRONG_PASSWORD_LONG = 'Пароль должен содержать не более 10 символов';
const NOT_ERROR = '';

class ValidationService {
  public validateRequired(value: string): string {
    if (!value) {
      return REQUIRED_FIELD;
    }

    return NOT_ERROR;
  }

  public validateName(name: string): string {
    if (!name) {
      return REQUIRED_FIELD;
    }

    if (name.length < 3) {
      return WRONG_NAME_SHORT;
    }

    if (name.length > 10) {
      return WRONG_NAME_LONG;
    }

    return NOT_ERROR;
  }

  public validatePassword(password: string): string {
    if (!password) {
      return ENTER_PASSWORD;
    }

    if (password.length < 3) {
      return WRONG_PASSWORD_SHORT;
    }

    if (password.length > 10) {
      return WRONG_PASSWORD_LONG;
    }

    return NOT_ERROR;
  }
}

export const validationService = new ValidationService();
