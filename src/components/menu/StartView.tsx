import React from 'react';
import { Outlet } from 'react-router-dom';
import { BgContainer, PhotoBackground } from './styles';

function StartView() {
  return (
    <>
      <PhotoBackground src="/photobg.jpg" alt="Photo Bg" />
      <BgContainer>
        <Outlet />
      </BgContainer>
    </>
  );
}

export default StartView;
