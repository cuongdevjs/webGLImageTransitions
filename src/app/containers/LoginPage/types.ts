/* --- STATE --- */

import { I_User } from '../App/types';

export interface PayloadLogin {
  email: string;
  password: string;
}

export interface ResponseLogin extends I_User {
  accessToken: string;
}

export interface LoginPageState {
  loading: boolean;
  success: boolean;
  error: boolean;
}

export type ContainerState = LoginPageState;
