import styled from 'styled-components';
import { motion } from 'framer-motion';

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

  & > * {
    flex: 0 0 auto;
  }
`;

export const Suptitle = styled.p`
  font-weight: 600;
  font-size: 3em;
  text-align: center;
  color: #000;
  margin: 0;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 8em;
  text-align: center;
  font-style: italic;
  color: #000;
`;

export const Btn = styled(motion.div)`
  width: 300px;
  height: 75px;
  background-color: #ddd;
  color: #baa2d5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: 500;
  box-shadow: 1px 1px 2px #00000050;

  &:hover {
    background-color: #baa2d5;
    color: #fff;
  }
`;
