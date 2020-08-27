import React from 'react';
import { objectType } from 'types';
import { history } from 'utils/history';
import { getItem, setItem, removeItem } from 'utils/localStorage';
import { LoginPage } from 'app/containers/LoginPage/Loadable';
import { Dashboard } from 'app/containers/Dashboard/Loadable';
import { LayoutProtectedRoute } from 'app/containers/LayoutProtectedRoute/Loadable';
import { TYPE_LOCAL_STORAGE } from '../constants';

const URL_REDIRECT = TYPE_LOCAL_STORAGE.URL_REDIRECT;
const TOKEN = TYPE_LOCAL_STORAGE.TOKEN;

function redirect(location) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      history.push(location);
    }
    render() {
      return null;
    }
  };
}

interface Props {
  isLogged: boolean;
  isFilterProtectedRoute?: boolean;
}

export const useRouter = ({
  isLogged,
  isFilterProtectedRoute = false,
}: Props) => {
  // list path never saved to redirect when logged
  const PATH_FOR_GUEST: string[] = ['signIn'];

  const urlRedirect = React.useMemo(() => isLogged && getItem(URL_REDIRECT), [
    isLogged,
  ]);

  const routeOnlyUser = React.useCallback(
    comp => {
      const token = getItem(TOKEN);
      // NOTE save link if not logged to redirect, consist query, params (save all except PATH_FOR_GUEST)
      const url_redirect = window.location.href.replace(
        window.location.origin,
        '',
      );
      !token &&
        !PATH_FOR_GUEST.some(path => url_redirect.includes(path)) &&
        setItem('admin_url_redirect', url_redirect);

      return isLogged ? comp : redirect('/signIn');
    },
    [isLogged, PATH_FOR_GUEST],
  );

  const routeOnlyGuest = React.useCallback(
    comp => {
      const token = getItem(TOKEN);
      token && removeItem(URL_REDIRECT);
      return !isLogged ? comp : redirect(urlRedirect || '/');
    },
    [urlRedirect, isLogged],
  );

  const routes: {
    path: string;
    exact: boolean;
    isMainRoute?: boolean;
    onlyGuestAccess?: boolean;
    props?: objectType;
    Component: any;
  }[] = React.useMemo(
    () => [
      {
        path: '/home',
        exact: false,
        onlyGuestAccess: false,
        isMainRoute: true,
        Component: routeOnlyUser(LayoutProtectedRoute),
      },
      {
        path: '/signIn',
        exact: true,
        onlyGuestAccess: true,
        isMainRoute: true,
        Component: routeOnlyGuest(LoginPage),
      },
      {
        path: '/home/dashboard',
        exact: true,
        onlyGuestAccess: false,
        isMainRoute: false,
        Component: routeOnlyUser(Dashboard),
      },
    ],
    [routeOnlyGuest, routeOnlyUser],
  );

  return isFilterProtectedRoute
    ? {
        routes: routes.filter(
          item => !item.onlyGuestAccess && !item.isMainRoute,
        ),
      }
    : { routes: routes.filter(item => item.isMainRoute) };
};
