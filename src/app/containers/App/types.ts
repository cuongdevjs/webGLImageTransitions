/* --- STATE --- */

export interface I_OptionNotification {
  autoHideDuration: number;
  type?: 'success' | 'info' | 'warning' | 'error';
  vertical: 'bottom' | 'top';
  horizontal: 'left' | 'center' | 'right';
  message: string;
}

export interface I_User {
  id: string;
  email: string;
  roles: {
    name: string;
    description: string;
  }[];
  user_permissions: {
    name: string;
    functionApi: string;
    action: string;
  }[];
}
export interface AppState {
  loading: boolean;
  success: boolean;
  error: boolean;
  isLogged: boolean;
  infoUser: Partial<I_User>; // user is nullable in that case not logged yet
  isOpenNotification: boolean;
  optionNotification: I_OptionNotification;
}

export type ContainerState = AppState;
