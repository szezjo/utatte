import styled from 'styled-components';

export const Container = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const PageTitleContainer = styled.div`
  margin: 24px 32px 0 32px;
`;

export const PageTitle = styled.div`
  color: #222222;
  font-size: 1.6em;
  font-weight: 800;
  text-align: left;
`;

export const SongsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100vw;
`;

export const SongGroupContainer = styled.div`
  display: block;
  margin-top: 50px;
`;

export const SongTableContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  writing-mode: vertical-lr;
`;
// Height to change

export const GroupNameContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 30px;
  width: auto;
`;

export const GroupName = styled.div`
  font-size: 1.4em;
  font-weight: 600;
  color: #222222;
`;

export const SongTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 200px);
  margin: 30px;
  row-gap: 60px;
  justify-content: start;
`;
