/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useContext } from 'react';
import { Container, SingButton, SingButtonContent, SingButtonContainer, Header, UtatteHeaderLogo } from './styles';
import { useNavigate } from 'react-router-dom';

function MainMenu() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Header>
          <UtatteHeaderLogo src="/utatteLogo.svg" alt="Utatte Logo" />
        </Header>
        <SingButtonContainer>
          <SingButton
            initial={{ scale: 1.0, color: '#baa2d5', backgroundColor: '#baa2d500' }}
            whileHover={{ scale: 1.2, backgroundColor: '#baa2d5ff', color: '#ffffff' }}
            transition={{ type: 'spring', duration: 0.25 }}
          >
            <SingButtonContent onClick={() => navigate('/songs')}>śpiewaj!</SingButtonContent>
          </SingButton>
        </SingButtonContainer>
      </Container>
    </>
  );
}

export default MainMenu;
