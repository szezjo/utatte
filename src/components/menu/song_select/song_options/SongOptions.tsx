import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faLanguage, faClock } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect } from 'react';
import {
  Container,
  Header,
  MainInfoStack,
  Title,
  Description,
  Artist,
  AlbumInfo,
  AdditionalInfoStack,
  AdditionalInfo,
  AdditionalInfoIcon,
  AdditionalInfoText,
} from './styles';
import { useAppSelector } from '../../../../hooks/rtkHooks';
import PreviewAudioPlayerContext from '../../../../context/PreviewAudioPlayerContext';

// type SongOptionsProps = {
//   name: string;
//   artist: string;
//   album: string;
//   releaseYear: number;
//   genre: string;
//   lang: string;
//   time: number;
//   isScoreModeSupported: boolean;
//   lyrics: string[];
// };

const convertTime = (sec: number) => {
  const min = Math.floor(sec / 60);
  const rem = sec % 60;

  return `${min}:${rem < 10 ? '0' : ''}${rem}`;
};

const address = import.meta.env.VITE_SERVER_ADDRESS;

function SongOptions() {
  const { name, artist, releaseYear, album, genre, lang, time, previewTime, apiSongId } = useAppSelector(
    (state) => state.songSelect,
  );

  const context = useContext(PreviewAudioPlayerContext);

  useEffect(() => {
    const fetchSong = async () => {
      const songUrl = `${address}/getTrack/${apiSongId}`;
      const res = await fetch(songUrl);
      const songBlob = await res.blob();
      const songObjectUrl = URL.createObjectURL(songBlob);

      if (context) context.setSrc({ source: songObjectUrl, previewTime });
      else console.log('context error');
    };

    fetchSong();
  }, [apiSongId]);

  const infoHeader = (
    <Header>
      <MainInfoStack>
        <Title>{name}</Title>
        <Description>
          <Artist>{artist}</Artist>
          <AlbumInfo>{`${releaseYear} · ${album}`}</AlbumInfo>
        </Description>
      </MainInfoStack>
      <AdditionalInfoStack>
        <AdditionalInfo>
          <AdditionalInfoText>{genre}</AdditionalInfoText>
          <AdditionalInfoIcon>
            <FontAwesomeIcon icon={faMusic} color="#868686" fixedWidth />
          </AdditionalInfoIcon>
        </AdditionalInfo>
        <AdditionalInfo>
          <AdditionalInfoText>{lang}</AdditionalInfoText>
          <AdditionalInfoIcon>
            <FontAwesomeIcon icon={faLanguage} color="#868686" fixedWidth />
          </AdditionalInfoIcon>
        </AdditionalInfo>
        <AdditionalInfo>
          <AdditionalInfoText>{convertTime(time)}</AdditionalInfoText>
          <AdditionalInfoIcon>
            <FontAwesomeIcon icon={faClock} color="#868686" fixedWidth />
          </AdditionalInfoIcon>
        </AdditionalInfo>
      </AdditionalInfoStack>
    </Header>
  );

  return <Container>{infoHeader}</Container>;
}

export default SongOptions;
