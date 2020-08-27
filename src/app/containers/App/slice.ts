import { TYPE_LOCAL_STORAGE } from './../../../utils/constants';
import { createRoutine } from 'redux-saga-routines';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, I_User, I_OptionNotification } from './types';
import { getItem, clearAllLS, setItem } from 'utils/localStorage';

// The initial state of the App container
export const initialState: ContainerState = {
  loading: false,
  success: false,
  error: false,
  infoUser: {},
  isLogged: false,
  isOpenNotification: false,
  optionNotification: {
    type: 'success',
    autoHideDuration: 3000,
    message: 'Thông báo:',
    vertical: 'bottom',
    horizontal: 'left',
  },
};

export const getMe = createRoutine('getMe');

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeIsOpenNotification: (state, action: PayloadAction<boolean>) => {
      state.isOpenNotification = action.payload;
    },
    setOptionNotification: (
      state,
      action: PayloadAction<Partial<I_OptionNotification>>,
    ) => {
      action?.payload?.type &&
        (state.optionNotification.type = action?.payload?.type);
      action?.payload?.autoHideDuration &&
        (state.optionNotification.autoHideDuration =
          action?.payload?.autoHideDuration);
      action?.payload?.message &&
        (state.optionNotification.message = action?.payload?.message);
      action?.payload?.vertical &&
        (state.optionNotification.vertical = action?.payload?.vertical);
      action?.payload?.horizontal &&
        (state.optionNotification.horizontal = action?.payload?.horizontal);
    },
    resetOptionNotification: state => {
      state.optionNotification.type = initialState.optionNotification.type;
      state.optionNotification.autoHideDuration =
        initialState.optionNotification.autoHideDuration;
      state.optionNotification.message =
        initialState.optionNotification.message;
      state.optionNotification.vertical =
        initialState.optionNotification.vertical;
      state.optionNotification.horizontal =
        initialState.optionNotification.horizontal;
    },
    changeIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
    updateInfoUser(state, action: PayloadAction<I_User>) {
      state.infoUser = { ...state.infoUser, ...action.payload };
    },
    setInfoUser(state, action: PayloadAction<I_User>) {
      state.infoUser = action.payload;
    },
    logout(state) {
      const meeting_url_redirect = getItem(TYPE_LOCAL_STORAGE.URL_REDIRECT);
      state.isLogged = false;
      state.infoUser = initialState.infoUser;
      clearAllLS();
      meeting_url_redirect &&
        setItem('meeting_url_redirect', meeting_url_redirect);
    },
  },
  extraReducers: {
    [getMe.TRIGGER]: state => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    [getMe.SUCCESS]: (state, action: PayloadAction<I_User>) => {
      state.infoUser = action.payload;
      state.loading = false;
      state.success = true;
      state.error = false;
    },
    [getMe.TRIGGER]: state => {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});

export const { actions, reducer, name: sliceKey } = appSlice;
