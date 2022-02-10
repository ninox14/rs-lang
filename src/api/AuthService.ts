import { USERS_ENDPOINT } from './ApiService';
import { http } from './http';
import { FormValues } from '../components/Form/Form';

export const USER_TOKEN_KEY = 'userToken';

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
    localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(response.data.token));
  }
  return response;
};

export const createUser = async (userData: FormValues) => {
  const response = await http.post<IUserData>(USERS_ENDPOINT, userData);
  if (response.status === 200) {
    await signIn(userData);
    return response;
  }
  return Promise.reject(response);
};

export const getNewTokens = async (userId: string) => {
  const endpoint = `${USERS_ENDPOINT}/${userId}/tokens`;
  const response = await http.get<IUserInfo>(endpoint);
  if (response.data) {
    localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(response.data.token));
  }
  return response;
};
