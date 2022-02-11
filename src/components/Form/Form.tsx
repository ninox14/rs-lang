import { FC, useState } from 'react';
import './Form.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// eslint-disable-next-line import/named
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setUserId } from '../../redux/word.slice';
import { loginHandler, registerHandler } from './services';
import { validationSchema } from './validation';
import { FomrProps, FormType, FormValues } from './types';

export const Form: FC<FomrProps> = ({ type }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    shouldUseNativeValidation: false,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const handler = type === FormType.LOGIN ? loginHandler : registerHandler;
    await handler(data, (msg, userId) => {
      if (msg) {
        setErrorMsg(msg);
      }
      if (userId) {
        dispatch(setUserId(userId));
        navigate(-1);
      }
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form__inputs">
        <TextField
          type="email"
          error={!!errors.email || !!errorMsg ? true : false}
          helperText={
            errors.email || errorMsg
              ? errorMsg
                ? errorMsg
                : errors.email?.message
              : null
          }
          FormHelperTextProps={{ className: 'helper_text' }}
          className="input"
          label="E-mail"
          variant="outlined"
          required
          inputProps={{ ...register('email') }}
          fullWidth
        />
        <TextField
          type="password"
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : null}
          FormHelperTextProps={{ className: 'helper_text' }}
          className="input"
          label="Пароль"
          variant="outlined"
          required
          inputProps={{ ...register('password') }}
          fullWidth
        />
      </div>
      <Button type="submit" className="form__button" variant="contained">
        {type === FormType.LOGIN ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};
