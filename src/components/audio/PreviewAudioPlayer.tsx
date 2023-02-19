import React, { forwardRef } from 'react';

export type PreviewAudioPlayerProps = {
  src: string;
};

const PreviewAudioPlayer = forwardRef<HTMLAudioElement, PreviewAudioPlayerProps>((props, ref) => (
  <audio ref={ref} preload="auto" loop>
    <track kind="captions" />
    <source src={props.src} type="audio/ogg" />
  </audio>
));

PreviewAudioPlayer.displayName = 'PreviewAudioPlayer';
export default PreviewAudioPlayer;
