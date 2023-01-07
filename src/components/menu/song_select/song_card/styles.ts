import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 360px;
  height: 100px;
  background-color: #fafafa;
`;

export const CardImage = styled.div<{ coverImg: string }>`
  display: block;
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.coverImg});
  background-size: cover;
`;

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
  font-size: 20px;
  line-height: 26px;
  margin: 0 8px 0 8px;
`;

export const CardSubtitle = styled.p`
  color: #868686;
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  margin: 0 8px 0 8px;
`;
