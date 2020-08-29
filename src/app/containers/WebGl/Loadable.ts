/**
 *
 * Asynchronously loads the component for WebGl
 *
 */

import { lazyLoad } from 'utils/loadable';

export const WebGl = lazyLoad(
  () => import('./index'),
  module => module.WebGl,
);
