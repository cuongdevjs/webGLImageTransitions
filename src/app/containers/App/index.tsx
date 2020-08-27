/**
 *
 * App
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions, getMe } from './slice';
import {
  selectIsLogged,
  selectOptionNotification,
  selectIsOpenNotification,
} from './selectors';
import { appSaga } from './saga';
import { AppWrapper } from './styled';
import { useRouter } from 'utils/hooks/useRouter';
import { CssBaseline, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import CheckNewVersion from './components/CheckNewVersion';
import { TYPE_LOCAL_STORAGE } from 'utils/constants';
import { getItem } from 'utils/localStorage';

interface Props {}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const App = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: appSaga });

  const isLogged = useSelector(selectIsLogged);
  const isOpenNotification = useSelector(selectIsOpenNotification);
  const optionNotification = useSelector(selectOptionNotification);
  const dispatch = useDispatch();
  // NOTE: isLogged change => routers re-render => redirect to url valid
  const { routes } = useRouter({ isLogged });

  React.useEffect(() => {
    const token = getItem(TYPE_LOCAL_STORAGE.TOKEN);
    if (token) {
      dispatch(getMe());
      dispatch(actions.changeIsLogged(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHideNotification = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    dispatch(actions.changeIsOpenNotification(false));
    dispatch(actions.resetOptionNotification());
  };

  return (
    <>
      <Helmet>
        <title>App</title>
        <meta name="description" content="Description of App" />
      </Helmet>
      <CheckNewVersion>
        {({ loading, isLatestVersion, refreshCacheAndReload }) => {
          if (loading) return <span>Loading</span>;
          if (!loading && !isLatestVersion) {
            refreshCacheAndReload();
          }
          return (
            <AppWrapper>
              <CssBaseline />
              <Switch>
                <Redirect exact from="/" to="/home" />
                {routes.map(({ path, Component, props, exact }) => (
                  <Route key={path} exact={exact} path={path}>
                    {({ match }) => <Component {...props} />}
                  </Route>
                ))}
              </Switch>
              <Snackbar
                open={isOpenNotification}
                onClose={onHideNotification}
                anchorOrigin={{
                  vertical: optionNotification?.vertical,
                  horizontal: optionNotification?.horizontal,
                }}
                autoHideDuration={optionNotification?.autoHideDuration}
              >
                <Alert
                  onClose={onHideNotification}
                  severity={optionNotification?.type}
                >
                  {optionNotification?.message}
                </Alert>
              </Snackbar>
            </AppWrapper>
          );
        }}
      </CheckNewVersion>
    </>
  );
});
