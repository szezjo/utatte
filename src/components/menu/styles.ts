import styled, { keyframes } from 'styled-components';

export const PhotoBackground = styled.img`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const gradient = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

export const BgContainer = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;

  color: #000;
  background: linear-gradient(-45deg, #fffc, #cccc);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
`;
