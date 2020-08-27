import { lazyLoad } from 'utils/loadable';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from '@material-ui/core';
/**
 *
Loadable LoginPage components
 *
 */

export const Form = lazyLoad(
  () => import('./Form'),
  module => module.FormLogin,
  {
    fallback: (
      <Grid container spacing={6} style={{ marginTop: '12px' }}>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            height={56}
            width={'100%'}
            animation="wave"
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            height={56}
            width={'100%'}
            animation="wave"
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rect"
            height={38}
            width={'100%'}
            animation="wave"
          />
        </Grid>
      </Grid>
    ),
  },
);
