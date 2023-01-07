import { motion } from 'framer-motion';
import styled from 'styled-components';

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

export const SingButton = styled(motion.div)`
  position: relative;
  width: 30vw;
  border-radius: 50%;
  border: #baa2d5 0.5vw solid;

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

export const Header = styled.div`
  display: flex;
  height: 10vh;
  width: calc(100% - 2vw);
  padding-left: 1vw;
  padding-right: 1vw;
  flex-direction: row;
  justify-content: space-between;
  flex-basis: 10vh;
`;

export const UtatteHeaderLogo = styled.img`
  width: 15vw;
`;

export const SingButtonContainer = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100%;
  margin-bottom: 10vh;
  justify-content: center;
  align-items: center;
`;
