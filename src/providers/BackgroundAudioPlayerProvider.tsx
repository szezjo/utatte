import React, { ReactNode, useEffect, useRef, useState } from 'react';
import BackgroundAudioPlayer from '../components/audio/BackgroundAudioPlayer';
import BackgroundAudioPlayerContext, { TBackgroundAudioPlayerContext } from '../context/BackgroundAudioPlayerContext';

type BackgroundAudioPlayerProviderProps = {
  children: ReactNode;
};

function BackgroundAudioPlayerProvider({ children }: BackgroundAudioPlayerProviderProps) {
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  const play = (): void => {
    if (!bgAudioRef || !bgAudioRef.current) return;
    bgAudioRef.current.play();
  };

  const pause = (): void => {
    if (!bgAudioRef || !bgAudioRef.current) return;
    bgAudioRef.current.pause();
  };

  const providerValue: TBackgroundAudioPlayerContext = {
    ref: bgAudioRef,
    play: play,
    pause: pause,
  };

  useEffect(() => play(), []);

  return (
    <>
      <BackgroundAudioPlayer ref={bgAudioRef} src="/bgMusic2.ogg" />
      <BackgroundAudioPlayerContext.Provider value={providerValue}>{children}</BackgroundAudioPlayerContext.Provider>
    </>
  );
}

export default BackgroundAudioPlayerProvider;
