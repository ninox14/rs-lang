import { FC } from 'react';
import './Form.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// eslint-disable-next-line import/named
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FomrProps {
  type: 'login' | 'register';
}

interface FormValues {
  email: string;
  password: string;
}

const validationSchema: yup.SchemaOf<FormValues> = yup.object({
  email: yup
    .string()
    .required('Это поле нужно заполнить')
    .email('Email вида example@mail.com')
    .trim('Не должно быть пустых символов в начале'),
  password: yup
    .string()
    .required('Это поле нужно заполнить')
    .min(8, 'Пароль минимум из 8 символов')
    .trim('Не должно быть пустых символов в начале'),
});

export const Form: FC<FomrProps> = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    shouldUseNativeValidation: false,
  });

  // TODO: Onsubmit for api
  const onSubmit: SubmitHandler<FormValues> = () => {};

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form__inputs">
        <TextField
          type="email"
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : null}
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
        {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};
