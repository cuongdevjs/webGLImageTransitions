/**
 *
 * Asynchronously loads the component for DrawerMenu
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DrawerMenu = lazyLoad(
  () => import('./index'),
  module => module.DrawerMenu,
);
