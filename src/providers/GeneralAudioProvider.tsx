import React, { ReactNode } from 'react';
import BackgroundAudioPlayerProvider from './BackgroundAudioPlayerProvider';
import PreviewAudioPlayerProvider from './PreviewAudioPlayerProvider';

type GeneralAudioProviderProps = {
  children: ReactNode;
};

function GeneralAudioProvider({ children }: GeneralAudioProviderProps) {
  return (
    <BackgroundAudioPlayerProvider>
      <PreviewAudioPlayerProvider>{children}</PreviewAudioPlayerProvider>
    </BackgroundAudioPlayerProvider>
  );
}

export default GeneralAudioProvider;
