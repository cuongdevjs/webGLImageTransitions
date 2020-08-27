/**
 *
 * LayoutProtectedRoute
 *
 */

import React, { memo, useState } from 'react';

import { LayoutProtectedRouteWrapper } from './styled';
import { useRouter } from 'utils/hooks/useRouter';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from 'app/components/Header/Loadable';
import { DrawerMenu } from 'app/components/DrawerMenu/Loadable';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectIsLogged } from '../App/selectors';

interface Props {}

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    padding: '20px',
  },
}));

export const LayoutProtectedRoute = memo((props: Props) => {
  const isLogged = useSelector(selectIsLogged);
  const { routes } = useRouter({
    isLogged,
    isFilterProtectedRoute: true,
  });
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const classes = useStyles();

  return (
    <LayoutProtectedRouteWrapper>
      <Header onToggleSideMenu={() => setIsOpenSideMenu(!isOpenSideMenu)} />
      <DrawerMenu
        isOpenSideMenu={isOpenSideMenu}
        onCloseSideMenu={() => setIsOpenSideMenu(false)}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Redirect exact from="/home" to="home/dashboard" />
          {routes.map(({ path, Component, props, exact }) => (
            <Route key={path} exact={exact} path={path}>
              {({ match }) => <Component {...props} />}
            </Route>
          ))}
          <Redirect to="home/dashboard" />
        </Switch>
      </main>
    </LayoutProtectedRouteWrapper>
  );
});
