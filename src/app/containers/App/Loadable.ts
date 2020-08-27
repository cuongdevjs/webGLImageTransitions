/**
 *
 * Asynchronously loads the component for App
 *
 */

import { lazyLoad } from 'utils/loadable';

export const App = lazyLoad(
  () => import('./index'),
  module => module.App,
);
