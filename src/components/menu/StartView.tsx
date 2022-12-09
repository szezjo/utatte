import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, PhotoBackground } from './styles';

function StartView() {
  return (
    <>
      <PhotoBackground src="/photobg.jpg" alt="Photo Bg" />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default StartView;
