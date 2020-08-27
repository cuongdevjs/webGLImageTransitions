import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.app || initialState;

export const selectApp = createSelector([selectDomain], appState => appState);

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

export const selectIsLogged = createSelector(
  [selectDomain],
  appState => appState.isLogged,
);

export const selectInfoUser = createSelector(
  [selectDomain],
  appState => appState.infoUser,
);

export const selectIsOpenNotification = createSelector(
  [selectDomain],
  appState => appState.isOpenNotification,
);

export const selectOptionNotification = createSelector(
  [selectDomain],
  appState => appState.optionNotification,
);
