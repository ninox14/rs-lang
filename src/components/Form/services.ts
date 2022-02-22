import { createUser, signIn } from 'api/AuthService';
import { FormValues } from 'components/Form/types';

export const registerHandler = async (data: FormValues) => {
  try {
    await createUser(data);
  } catch (err) {
    console.error(err);
  }
};
export const loginHandler = async (
  data: FormValues,
  callback: (isLogin: boolean) => void
) => {
  try {
    await signIn(data);
    callback(true);
  } catch (err) {
    console.error(err);
  }
};
