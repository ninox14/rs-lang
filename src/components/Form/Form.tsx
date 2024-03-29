import { FC, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigate } from 'react-router-dom';

import { loginHandler, registerHandler } from 'components/Form/services';
import validationSchema from 'components/Form/validation';
import { FomrProps, FormType, FormValues } from './types.d';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setErrorMsg } from 'redux/word.slice';

const Form: FC<FomrProps> = ({ type }) => {
  const errorMsg = useAppSelector((state) => state.word.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setErrorMsg(''));
    return () => {
      dispatch(setErrorMsg(''));
    };
  }, []);

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
    await handler(data, (isLogin) => {
      if (isLogin) {
        navigate(-1);
      }
    });
  };
  const changeHandler = () => dispatch(setErrorMsg(''));

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form__inputs">
        <TextField
          autoComplete="off"
          type="email"
          error={!!errors.email || !!errorMsg ? true : false}
          helperText={
            errors.email || errorMsg
              ? errorMsg
                ? errorMsg
                : errors.email?.message
              : null
          }
          FormHelperTextProps={{
            className: 'helper-text form__input-helper-text',
          }}
          className="input form__input"
          label="E-mail"
          variant="outlined"
          required
          inputProps={{ ...register('email') }}
          fullWidth
          onChange={changeHandler}
        />
        <TextField
          autoComplete="off"
          type="password"
          error={!!errors.password || !!errorMsg}
          helperText={errors.password ? errors.password.message : null}
          FormHelperTextProps={{
            className: 'helper-text form__input-helper-text',
          }}
          className="input form__input"
          label="Пароль"
          variant="outlined"
          required
          inputProps={{ ...register('password') }}
          fullWidth
          onChange={changeHandler}
        />
      </div>
      <Button type="submit" className="button form__button" variant="contained">
        {type === FormType.LOGIN ? 'Войти' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};

export default Form;
