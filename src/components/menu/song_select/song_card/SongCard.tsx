import React from 'react';
import { CardContainer, CardImage, CardContent, CardTitle, CardSubtitle } from './styles';

type SongCardProps = {
  name: string;
  artist: string;
  coverImg: string;
};

function SongCard({ name, artist, coverImg }: SongCardProps) {
  return (
    <CardContainer initial={{ scale: 1.0 }} whileHover={{ scale: 1.1 }}>
      <CardImage coverImg={coverImg} />
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle>{artist}</CardSubtitle>
      </CardContent>
    </CardContainer>
  );
}

export default SongCard;
