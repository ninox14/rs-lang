import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { USER_TOKEN_KEY } from "./AuthService";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  UserExists = 417,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const token = localStorage.getItem(USER_TOKEN_KEY);

    if (token != null && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(token, config.headers)
    }
    return config;
  } catch (error) {
    throw error;
  }
};

class Http {
  // eslint-disable-next-line prettier/prettier
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: 'https://rs-lang-team-34.herokuapp.com',
      headers,
      // withCredentials: true, <- triggers CORS error for some reason
    });

    http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  request<T = unknown, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T | unknown,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = unknown, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error: AxiosResponse) {
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Maybe try to refresh tokens on handle
        // const token = localStorage.getItem(USER_TOKEN_KEY);
        // if (token) {
          //TODO get user id from store
          // getNewTokens('123');
          // error.statusText = ''
        // }
        // error.statusText = ''test@mail.ru
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
      case StatusCode.UserExists: {
        error.data = 'Пользователь с таким e-mail уже существует';
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();