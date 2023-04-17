import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundAudioPlayerContext from '../../../context/BackgroundAudioPlayerContext';
import { useAppSelector } from '../../../hooks/rtkHooks';
import { Btn, Container, Suptitle, Title } from './styles';

function End() {
  const { passed, all } = useAppSelector((state) => state.score);
  const bgContext = useContext(BackgroundAudioPlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (passed === 0 || all === 0) navigate('/');
    if (bgContext) {
      bgContext.reset();
    }
  }, []);

  return (
    <Container>
      <Suptitle>Wynik</Suptitle>
      <Title>{`${((100 * passed) / all).toFixed(2)}%`}</Title>
      <Btn initial={{ scale: 1.0 }} whileHover={{ scale: 1.1 }} onClick={() => navigate('/songs')}>
        Wróć do menu
      </Btn>
    </Container>
  );
}

export default End;
