/**
 *
 * Asynchronously loads the component for LayoutProtectedRoute
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LayoutProtectedRoute = lazyLoad(
  () => import('./index'),
  module => module.LayoutProtectedRoute,
);
