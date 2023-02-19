import { motion } from 'framer-motion';
import styled from 'styled-components';

export const OptionCardContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  box-shadow: 2px 2px 4px #00000050;
  width: 100%;
  height: 50px;
  margin: 5px 0;
`;

export const OptionCardName = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin: auto;
  color: #000;
  flex: 1;
  padding: 0 8px;
`;

export const OptionCardStack = styled.div`
  display: inline-flex;
  flex: 2;
`;

interface OptionCardIconProps {
  isSelectable: boolean;
}

export const OptionCardIcon = styled.div<OptionCardIconProps>`
  display: inline-flex;
  align-items: center;
  margin: 0 0.5em;
  color: ${(props) => (props.isSelectable ? '#868686' : '#DDD')};

  &:hover {
    color: ${(props) => (props.isSelectable ? '#BAA2D5' : '#DDD')};
  }
`;

export const OptionCardSelection = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  margin: auto;
  color: #000;
`;
