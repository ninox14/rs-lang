import { FC } from 'react';
import './Form.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
interface FomrProps {
  email?: string;
  password?: string;
  type?: 'login' | 'register';
  // TODO onsubmit
  onSubmit?: any;
}

export const Form: FC<FomrProps> = ({ type }) => {
  return (
    <form className="form">
      <div className="form__inputs">
        <TextField type="email" className="input" label="E-mail" variant="outlined" required />
        <TextField type="password" className="input" label="Password" variant="outlined" required />
      </div>
      <Button className="button" variant="contained">
        {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};
