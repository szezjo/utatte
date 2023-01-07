import React, { forwardRef } from 'react';

export type BackgroundAudioPlayerProps = {
  src: string;
};

const BackgroundAudioPlayer = forwardRef<HTMLAudioElement, BackgroundAudioPlayerProps>((props, ref) => (
  <audio ref={ref} preload="auto" loop>
    <track kind="captions" />
    <source src={props.src} type="audio/ogg" />
  </audio>
));

BackgroundAudioPlayer.displayName = 'BackgroundAudioPlayer';
export default BackgroundAudioPlayer;
