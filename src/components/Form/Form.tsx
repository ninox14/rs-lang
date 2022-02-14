import { FC } from 'react';

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
const Form: FC<FomrProps> = ({ type }) => {
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

export default Form;
