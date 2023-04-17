import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faLanguage, faClock } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
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
  SubContainer,
  CoverImage,
  ImageContainer,
  CircularButtonContent,
  ModesStack,
  CircularButton,
  SubStack,
  SmallerCircularButton,
  SmallerCircularButtonContent,
  OptionsStack,
  ModesButtonsWrapper,
  PhotoBackground,
  CircularButtonDisabled,
} from './styles';
import { useAppDispatch, useAppSelector } from '../../../../hooks/rtkHooks';
import PreviewAudioPlayerContext from '../../../../context/PreviewAudioPlayerContext';
import { useNavigate } from 'react-router-dom';
import OptionCard from './option_card/OptionCard';
import { setPlayingSong } from '../../../../features/songPlayer';

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
  const {
    name,
    artist,
    releaseYear,
    album,
    genre,
    lang,
    time,
    previewTime,
    apiSongId,
    coverUrl,
    isScoreModeSupported,
  } = useAppSelector((state) => state.songSelect);

  const [isFreeModeSelected, setIsFreeModeSelected] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  const [song, setSong] = useState('');
  const [musicType, setMusicType] = useState(0);
  const [lyricsType, setLyricsType] = useState(0);
  const [bgType, setBgType] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    if (!name.length && apiSongId === -1) navigate('/');
  }, []);

  useEffect(() => {
    if (!isScoreModeSupported) setIsFreeModeSelected(true);
  }, [isScoreModeSupported]);

  const context = useContext(PreviewAudioPlayerContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchSong = async () => {
      const songUrl = `${address}/getTrack/${apiSongId}`;
      const res = await fetch(songUrl);
      const songBlob = await res.blob();
      const songObjectUrl = URL.createObjectURL(songBlob);

      setSong(songObjectUrl);
      if (context) context.setSrc({ source: songObjectUrl, previewTime });
      else console.log('context error');
    };

    fetchSong();
  }, [apiSongId]);

  const startSong = () => {
    if (!context) return;

    dispatch(setPlayingSong({ audioFile: song, apiSongId: apiSongId, freeMode: isFreeModeSelected }));
    context.stop();
    navigate('/game', { replace: true });
  };

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

  return (
    <>
      <PhotoBackground src={coverUrl} />
      <Container>
        {infoHeader}
        <SubContainer>
          <SubStack>
            <ModesStack>
              <ModesButtonsWrapper>
                {isScoreModeSupported ? (
                  <CircularButton
                    isFreeModeSelected={isFreeModeSelected}
                    initial={{
                      scale: 1.0,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{ type: 'spring', duration: 0.25 }}
                    onClick={() => setIsFreeModeSelected(false)}
                  >
                    <CircularButtonContent>tryb punktacji</CircularButtonContent>
                  </CircularButton>
                ) : (
                  <CircularButtonDisabled>
                    <CircularButtonContent>tryb punktacji</CircularButtonContent>
                  </CircularButtonDisabled>
                )}
                <SmallerCircularButton
                  isFreeModeSelected={isFreeModeSelected}
                  initial={{
                    scale: 1.0,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{ type: 'spring', duration: 0.25 }}
                  onClick={() => setIsFreeModeSelected(true)}
                >
                  <SmallerCircularButtonContent>tryb swobodny</SmallerCircularButtonContent>
                </SmallerCircularButton>
              </ModesButtonsWrapper>
            </ModesStack>
            <ImageContainer>
              <CoverImage src={coverUrl} onClick={startSong} />
            </ImageContainer>
            <OptionsStack>
              <OptionCard
                optionName="Poziom trudności"
                options={['Bardzo łatwy', 'Łatwy', 'Średni', 'Trudny', 'Ekspert']}
                selectedOption={difficultyLevel}
                setOption={setDifficultyLevel}
              />
              <OptionCard
                optionName="Muzyka"
                options={['Albumowa', 'Instrumentalna']}
                selectedOption={musicType}
                setOption={setMusicType}
              />
              <OptionCard
                optionName="Słowa"
                options={['Romaji', 'Kanji']}
                selectedOption={lyricsType}
                setOption={setLyricsType}
              />
              <OptionCard
                optionName="Tło"
                options={['Dołączone wideo', 'Statyczne tło', 'Pokaz zdjęć']}
                selectedOption={bgType}
                setOption={setBgType}
              />
            </OptionsStack>
          </SubStack>
        </SubContainer>
      </Container>
    </>
  );
}

export default SongOptions;
