/**
 *
 * Lottie
 *
 */
import React, { memo } from 'react';
import { LottieWrapper } from './styled';
import { default as LottieContainer } from 'react-lottie';
import animationData from './30840-work-from-home.json';

interface Props {}

export const Lottie = memo((props: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <LottieWrapper>
      <LottieContainer options={defaultOptions} />
    </LottieWrapper>
  );
});
