import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import PreviewAudioPlayer from '../components/audio/PreviewAudioPlayer';
import BackgroundAudioPlayerContext from '../context/BackgroundAudioPlayerContext';
import PreviewAudioPlayerContext, { TPreviewAudioPlayerContext } from '../context/PreviewAudioPlayerContext';
import { SourceData } from '../types';

type PreviewAudioPlayerProviderProps = {
  children: ReactNode;
};

function PreviewAudioPlayerProvider({ children }: PreviewAudioPlayerProviderProps) {
  const prAudioRef = useRef<HTMLAudioElement | null>(null);
  const [src, setSrc] = useState<SourceData>({ source: '', previewTime: 0 });

  const bgContext = useContext(BackgroundAudioPlayerContext);

  const play = (): void => {
    if (!prAudioRef || !prAudioRef.current) return;
    prAudioRef.current.play();
  };

  const pause = (): void => {
    if (!prAudioRef || !prAudioRef.current) return;
    prAudioRef.current.pause();
  };

  const load = (): void => {
    if (!prAudioRef || !prAudioRef.current) return;
    prAudioRef.current.load();
  };

  const seek = (time: number): void => {
    if (!prAudioRef || !prAudioRef.current) return;
    prAudioRef.current.currentTime = time;
  };

  const unload = (): void => {
    if (!src.source.length || !prAudioRef || !prAudioRef.current) return;
    prAudioRef.current.pause();
    setSrc({ source: '', previewTime: 0 });
    if (bgContext) bgContext.play();
  };

  const stop = (): void => {
    if (!src.source.length || !prAudioRef || !prAudioRef.current) return;
    prAudioRef.current.pause();
    setSrc({ source: '', previewTime: 0 });
  };

  const providerValue: TPreviewAudioPlayerContext = {
    ref: prAudioRef,
    pause: pause,
    unload: unload,
    stop: stop,
    setSrc: setSrc,
  };

  useEffect(() => {
    if (!src.source.length) return;
    if (bgContext) bgContext.pause();
    load();
    seek(src.previewTime);
    play();
  }, [src]);

  return (
    <>
      <PreviewAudioPlayer ref={prAudioRef} src={src.source} />
      <PreviewAudioPlayerContext.Provider value={providerValue}>{children}</PreviewAudioPlayerContext.Provider>
    </>
  );
}

export default PreviewAudioPlayerProvider;
