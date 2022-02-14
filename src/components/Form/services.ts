import { createUser, signIn } from 'api/AuthService';
import { FormValues } from 'components/Form/types';

export const registerHandler = async (data: FormValues) => {
  try {
    const response = await createUser(data);
    console.log(response); // To be removed later
  } catch (err) {
    console.error(err);
  }
};
export const loginHandler = async (
  data: FormValues,
  callback: (isLogin: boolean) => void
) => {
  try {
    const response = await signIn(data);
    callback(true);
    console.log(response); // To be removed later
  } catch (err) {
    console.error(err);
  }
};
