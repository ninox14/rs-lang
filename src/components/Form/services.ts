import { createUser, signIn } from '../../api/AuthService';
import { FormValues } from './types';

export const registerHandler = async (
  data: FormValues,
  callback: (msg: string, userId: string) => void
) => {
  try {
    const response = await createUser(data);
    console.log(response); // To be removed later
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.data && typeof err.data === 'string') {
      callback(err.data, '');
    }
    console.error(err);
  }
};
export const loginHandler = async (
  data: FormValues,
  callback: (msg: string, userId: string) => void
) => {
  try {
    const response = await signIn(data);
    callback('', response.data.userId);
    console.log(response); // To be removed later
  } catch (err) {
    console.error(err);
  }
};
