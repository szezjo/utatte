import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  width: 360px;
  height: 100px;
  background-color: #fafafa;
  writing-mode: horizontal-tb;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  &:hover {
    background-color: #baa2d5;
    z-index: 1000;
  }

  &:hover p {
    color: #ffffff;
  }
`;

// original width: 360px; height: 100px;

export const CardImage = styled.div<{ coverImg: string }>`
  display: block;
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.coverImg});
  background-size: cover;
`;

// original dimensions: 100x100px

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const CardTitle = styled.p`
  color: #202020;
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 1.1em;
  line-height: 26px;
  margin: 0 8px 0 8px;
`;

export const CardSubtitle = styled.p`
  color: #868686;
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 1em;
  line-height: 21px;
  margin: 0 8px 0 8px;
`;
