import * as yup from 'yup';
import { FormValues } from 'components/Form/types';

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

export default validationSchema;
