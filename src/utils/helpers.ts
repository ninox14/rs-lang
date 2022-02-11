import { USERS_ENDPOINT } from '../api/ApiService';

export const makeUserWordEndpoint = (userId: string, wordId: string) =>
  `${USERS_ENDPOINT}/${userId}/words/${wordId}`;
