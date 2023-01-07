import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

export const UtatteLogoContainer = styled.div`
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
  width: 100%;
`;

export const UtatteLogo = styled.img`
  width: 40vw;
`;

export const StartButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  width: 100%;
  text-align: right;
  font-size: 3vw;
  line-height: 3vw;
  font-weight: 800;
  color: #baa2d5;
`;

export const StartButton = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding-right: 2vw;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
`;
