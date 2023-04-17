import React, { createContext } from 'react';

//const BackgroundAudioPlayerContext = createContext<React.MutableRefObject<HTMLAudioElement | null> | null>(null);
export type TBackgroundAudioPlayerContext = {
  ref: React.MutableRefObject<HTMLAudioElement | null>;
  play: () => void;
  pause: () => void;
  reset: () => void;
};

const BackgroundAudioPlayerContext = createContext<TBackgroundAudioPlayerContext | null>(null);

export default BackgroundAudioPlayerContext;
