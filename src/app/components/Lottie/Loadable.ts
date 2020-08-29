/**
 *
 * Asynchronously loads the component for Lottie
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Lottie = lazyLoad(
  () => import('./index'),
  module => module.Lottie,
);
