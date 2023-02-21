import React, { createContext } from 'react';
import { SourceData } from '../types';

//const BackgroundAudioPlayerContext = createContext<React.MutableRefObject<HTMLAudioElement | null> | null>(null);
export type TPreviewAudioPlayerContext = {
  ref: React.MutableRefObject<HTMLAudioElement | null>;
  pause: () => void;
  unload: () => void;
  stop: () => void;
  setSrc: (src: SourceData) => void;
};

const PreviewAudioPlayerContext = createContext<TPreviewAudioPlayerContext | null>(null);

export default PreviewAudioPlayerContext;
