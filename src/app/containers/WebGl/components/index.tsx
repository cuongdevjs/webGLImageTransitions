/**
 *
 * Loadable WebGl components
 *
 */

import React from 'react';
import { Lottie } from 'app/components/Lottie';
import { lazyLoad } from 'utils/loadable';

export const CanvasContainer = lazyLoad(
  () => import('./CanvasContainer'),
  module => module.CanvasContainer,
  {
    fallback: <Lottie />,
  },
);
