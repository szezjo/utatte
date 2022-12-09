import { motion } from 'framer-motion';
import styled from 'styled-components';

export const SingButton = styled(motion.div)`
  position: relative;
  width: 30vw;
  border-radius: 50%;
  background-color: #baa2d500;
  border: #baa2d5 0.5vw solid;
  color: #baa2d5;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export const SingButtonContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 4vw;
  font-weight: 800;
  transform: rotate(-5deg);
`;
