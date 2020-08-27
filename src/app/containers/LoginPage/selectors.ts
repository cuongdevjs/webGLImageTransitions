import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.loginPage || initialState;

export const selectLoginPage = createSelector(
  [selectDomain],
  loginPageState => loginPageState,
);

export const selectIsLoading = createSelector(
  [selectDomain],
  appState => appState.loading,
);

export const selectIsSuccess = createSelector(
  [selectDomain],
  appState => appState.success,
);

export const selectIsError = createSelector(
  [selectDomain],
  appState => appState.error,
);
