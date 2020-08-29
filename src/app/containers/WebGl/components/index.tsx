/**
 *
 * Loadable WebGl components
 *
 */

import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const CanvasContainer = lazyLoad(
  () => import('./CanvasContainer'),
  module => module.CanvasContainer,
  {
    fallback: <>Loading</>,
  },
);
