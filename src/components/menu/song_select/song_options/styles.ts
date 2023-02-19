import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fffe;
`;

export const PhotoBackground = styled.img`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: -9999;
  filter: blur(4px) grayscale(100%);
`;

export const Header = styled.div`
  width: 100vw;
  height: 100px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px #00000050;
`;

export const MainInfoStack = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  margin: 16px;
`;

export const Title = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.5em;
  color: #202020;
  margin: 0;
  text-align: left;
`;

export const Description = styled.div`
  display: block;
  align-self: flex-start;
`;

export const Artist = styled.p`
  display: inline-block;
  font-style: normal;
  font-weight: 500;
  font-size: 1.5em;
  line-height: 1em;
  color: #868686;
  margin: 0;
  text-align: left;
`;

export const AlbumInfo = styled.p`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  line-height: 1em;
  color: #a6a6a6;
  margin: 0 0 0 0.5em;
  padding-bottom: 0.15em;
  text-align: left;
`;

export const AdditionalInfoStack = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: fit-content;
  margin: 16px;
`;

export const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const AdditionalInfoIcon = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 0.5em 0 0.5em;
`;

export const AdditionalInfoText = styled.p`
  display: inline-block;
  font-style: normal;
  font-weight: 500;
  font-size: 1em;
  line-height: 1em;
  text-align: right;
  color: #868686;
  margin: 0.25em 0 0.25em 0;
`;

export const SubContainer = styled.div`
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

export const SubStack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const CoverImage = styled.img`
  width: 25vw;
  border-radius: 2.5vw;
  box-shadow: 2px 2px 4px #00000050;
`;

export const ModesStack = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ModesButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;

interface ButtonProps {
  isFreeModeSelected: boolean;
}

export const CircularButton = styled(motion.div)<ButtonProps>`
  position: relative;
  width: 20vw;
  border-radius: 50%;
  border: #baa2d5 0.5vw solid;
  background-color: ${(props) => (props.isFreeModeSelected ? '#baa2d500' : '#baa2d5ff')};
  color: ${(props) => (props.isFreeModeSelected ? '#baa2d5' : '#ffffff')};

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  &:hover {
    background-color: ${(props) => (props.isFreeModeSelected ? '#baa2d5bb' : '#baa2d5ff')};
    color: #ffffff;
  }
`;

export const CircularButtonContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-size: 2vw;
  font-weight: 800;
  transform: rotate(-5deg);
`;

export const SmallerCircularButton = styled(CircularButton)`
  background-color: ${(props) => (props.isFreeModeSelected ? '#baa2d5ff' : '#baa2d500')};
  color: ${(props) => (props.isFreeModeSelected ? '#ffffff' : '#baa2d5')};
  width: 10vw;

  &:hover {
    background-color: ${(props) => (props.isFreeModeSelected ? '#baa2d5ff' : '#baa2d5bb')};
    color: #ffffff;
  }
`;

export const SmallerCircularButtonContent = styled(CircularButtonContent)`
  font-size: 1vw;
`;

export const OptionsStack = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
