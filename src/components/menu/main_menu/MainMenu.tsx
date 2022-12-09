/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';
import { SingButton, SingButtonContent } from './styles';

function MainMenu() {
  const audioRef = useRef(null);

  return (
    <>
      <audio ref={audioRef} preload="auto" autoPlay>
        <source src={`/bgMusic.ogg`} type="audio/ogg" />
      </audio>
      <SingButton
        whileHover={{ scale: 1.2, backgroundColor: '#baa2d5ff', color: 'white' }}
        transition={{ type: 'spring', duration: 0.25 }}
      >
        <SingButtonContent>śpiewaj!</SingButtonContent>
      </SingButton>
    </>
  );
}

export default MainMenu;
