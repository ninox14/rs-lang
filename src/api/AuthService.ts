import { http } from './http';
import { store } from '../redux/store';
import { setUserId } from '../redux/word.slice';
import { USERS_ENDPOINT } from './ApiService';
import { FormValues } from '../components/Form/types';

export const USER_TOKEN_KEY = 'userToken';
export const USER_REFRESH_TOKEN_KEY = 'userRefreshToken';

interface IUserData extends FormValues {
  name: string;
}

interface IUserInfo {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export const signIn = async (userData: FormValues) => {
  const response = await http.post<IUserInfo>('/signin', userData);
  if (response.data) {
    localStorage.setItem(USER_TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_REFRESH_TOKEN_KEY, response.data.refreshToken);
  }
  return response;
};

export const createUser = async (userData: FormValues) => {
  const response = await http.post<IUserData>(USERS_ENDPOINT, userData);
  if (response.status === 200) {
    const signInResponse = await signIn(userData);
    return signInResponse;
  }
  return Promise.reject(response);
};

export const getNewTokens = async (userId: string) => {
  const endpoint = `${USERS_ENDPOINT}/${userId}/tokens`;
  const response = await http.get<IUserInfo>(endpoint);
  if (response.data) {
    localStorage.setItem(USER_TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_REFRESH_TOKEN_KEY, response.data.refreshToken);
  }
  return response;
};
export const logOut = () => {
  localStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem(USER_REFRESH_TOKEN_KEY);
  store.dispatch(setUserId(''));
};
