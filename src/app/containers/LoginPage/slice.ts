import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';
import { ContainerState, PayloadLogin, ResponseLogin } from './types';
import { setItem } from 'utils/localStorage';
import { TYPE_LOCAL_STORAGE } from 'utils/constants';

// The initial state of the LoginPage container
export const initialState: ContainerState = {
  loading: false,
  error: false,
  success: false,
};

export const login = createRoutine('loginAction');

const loginPageSlice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    resetData(state) {
      state.loading = initialState.loading;
      state.success = initialState.success;
      state.error = initialState.error;
    },
  },
  extraReducers: {
    [login.TRIGGER]: (state, action: PayloadAction<PayloadLogin>) => {
      state.loading = true;
      state.success = false;
      state.error = true;
    },
    [login.SUCCESS]: (state, action: PayloadAction<ResponseLogin>) => {
      setItem(TYPE_LOCAL_STORAGE.TOKEN, action.payload.accessToken);
      state.loading = false;
      state.success = true;
      state.error = false;
    },
    [login.FAILURE]: state => {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});

export const { actions, reducer, name: sliceKey } = loginPageSlice;
