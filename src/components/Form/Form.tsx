import { FC, useState } from 'react';
import './Form.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// eslint-disable-next-line import/named
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUser, signIn } from '../../api/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { wordsSlice } from '../../redux/word.slice';

interface FomrProps {
  type: FormType;
}
export enum FormType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}
export interface FormValues {
  email: string;
  password: string;
}

const validationSchema: yup.SchemaOf<FormValues> = yup.object({
  email: yup
    .string()
    .required('Введите e-mail')
    .email('Введите существующий e-mail')
    .matches(/^[\w\-]+@[a-z]+.[a-z]+$/im, {
      message: 'Введите существующий e-mail',
    }),
  password: yup
    .string()
    .required('Введите пароль')
    .min(8, 'Пароль должен содержать не менее 8 символов')
    .matches(/^[a-z\d]+$/im, {
      message:
        'Можно использовать только символы латинского алфавита или цифры',
    }),
});

export const Form: FC<FomrProps> = ({ type }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { setUserId } = wordsSlice.actions;
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    shouldUseNativeValidation: false,
  });

  const registerHandler = async (data: FormValues) => {
    try {
      const response = await createUser(data);
      dispatch(setUserId(response.data.userId));
      console.log(response); // To be removed later
      navigate(-1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.data && typeof err.data === 'string') {
        setErrorMsg(err.data);
      }
      console.error(err);
    }
  };
  const loginHandler = async (data: FormValues) => {
    try {
      const response = await signIn(data);
      dispatch(setUserId(response.data.userId));
      console.log(response); // To be removed later
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    switch (type) {
      case FormType.LOGIN:
        await loginHandler(data);
        break;
      case FormType.REGISTER:
        await registerHandler(data);
        break;
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form__inputs">
        <TextField
          type="email"
          error={!!errors.email || !!errorMsg}
          helperText={
            errors.email || errorMsg
              ? errorMsg
                ? errorMsg
                : errors.email
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
