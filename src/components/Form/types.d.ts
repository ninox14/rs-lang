export interface FomrProps {
  type: FormType;
}
export enum FormType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}
export interface FormValues {
  email: string;
  password: string;
}
