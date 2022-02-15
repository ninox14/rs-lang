import { http } from 'api/http';
import { store } from 'redux/store';
import { setUserId } from 'redux/word.slice';
import { FormValues } from 'components/Form/types';
import { USERS_ENDPOINT } from 'api/ApiService';

export const USER_TOKEN_KEY = 'userToken';
export const USER_REFRESH_TOKEN_KEY = 'userRefreshToken';
export const USER_ID_KEY = 'userId';
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
  const {
    data: { userId, refreshToken, token },
  } = response;
  const isThereUserData = userId && refreshToken && token;
  if (isThereUserData) {
    store.dispatch(setUserId(userId));
    localStorage.setItem(USER_ID_KEY, userId);
    localStorage.setItem(USER_TOKEN_KEY, token);
    localStorage.setItem(USER_REFRESH_TOKEN_KEY, refreshToken);
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
  const currentRefreshToken = localStorage.getItem(USER_REFRESH_TOKEN_KEY);
  if (!currentRefreshToken) {
    throw new Error('Forbidden! No refresh token present in localstorage.');
  }
  const endpoint = `${USERS_ENDPOINT}/${userId}/tokens`;
  const response = await http.get<IUserInfo>(endpoint, {
    transformRequest: [
      (_, headers) => {
        if (headers) {
          headers.Authorization = `Bearer ${currentRefreshToken}`;
          console.log('transformed header', headers.Authorization);
        }
      },
    ],
  });
  if (response.data.token && response.data.refreshToken) {
    localStorage.setItem(USER_TOKEN_KEY, response.data.token);
    localStorage.setItem(USER_REFRESH_TOKEN_KEY, response.data.refreshToken);
  }
  return response;
};
export const logOut = () => {
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem(USER_REFRESH_TOKEN_KEY);
  store.dispatch(setUserId(''));
};
// It doesnt return login data despite it being show as a return in swagger docs entity LOL
// const getUserData = async (userId: string) => {
//   const endpoint = `${USERS_ENDPOINT}/${userId}`;
//   const response = await http.get<FormValues>(endpoint);
//   return response;
// };

export const relogin = async () => {
  const userId = localStorage.getItem(USER_ID_KEY);
  if (userId) {
    try {
      const res = await getNewTokens(userId);
      console.log(res);
      store.dispatch(setUserId(userId));
    } catch (err) {
      console.error('Probably tokens were deleted or expired');
      console.error(err);
      logOut();
    }
  }
};
