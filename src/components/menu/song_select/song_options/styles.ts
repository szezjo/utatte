import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ddd;
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
