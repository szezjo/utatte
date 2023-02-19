import React, { useContext, useEffect, useState } from 'react';
import SongCard from './song_card/SongCard';
import { useGetSongsListQuery } from '../../../api';
import { SongData } from '../../../types';
import {
  Container,
  SongTableContainer,
  SongTable,
  GroupName,
  GroupNameContainer,
  SongGroupContainer,
  PageTitleContainer,
  PageTitle,
  SongsContainer,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import { setSelectedSong } from '../../../features/songSelect';
import PreviewAudioPlayerContext from '../../../context/PreviewAudioPlayerContext';

const address = import.meta.env.VITE_SERVER_ADDRESS;

interface SongGroups {
  [key: string]: SongDataWithCover[];
}

type SongDataWithCover = SongData & { coverImage: string };

function SongSelect() {
  const { data: songList, isLoading, isSuccess, isError, error } = useGetSongsListQuery();
  const [coverImages, setCoverImages] = useState<string[]>([]);
  const [songsWithCovers, setSongsWithCovers] = useState<SongDataWithCover[]>([]);
  if (isLoading) console.log('loading');
  if (isSuccess) console.log(songList);
  if (isError) console.error(error);
  const navigate = useNavigate();

  const prContext = useContext(PreviewAudioPlayerContext);
  useEffect(() => {
    if (prContext) prContext.unload();
  }, []);

  const fetchImage = async (imageUrl: string) => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    if (imageBlob.type !== 'image/jpeg') return '/no_cover.jpg';
    const imageObjectUrl = URL.createObjectURL(imageBlob);
    return imageObjectUrl;
  };

  const isNumeric = (str: string) => {
    return !Number.isNaN(Number(str));
  };

  const groupByAlphabet = (songs: SongDataWithCover[], nameType: 'name' | 'romajiName') => {
    const grouped: SongGroups = {};
    songs.forEach((item: SongDataWithCover) => {
      const firstLet = item[nameType].substring(0, 1).toUpperCase();
      const groupId = isNumeric(firstLet) ? '#' : firstLet;
      grouped[groupId] ||= [];
      grouped[groupId].push(item);
    });
    //console.log(grouped);
    return Object.entries(grouped).map(([key, value]) => {
      return { groupId: key, songs: value };
    });
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (isSuccess) {
        const _songsWithCovers = songList.map(async (item: SongData) => {
          return fetchImage(`${address}/getCoverImage/${item.id}`).then((value) => {
            return { ...item, coverImage: value };
          });
        });
        Promise.all(_songsWithCovers).then((values) => setSongsWithCovers(values));
      }
    };

    fetchImages();
    // if (isSuccess) {
    //   //const grouped = groupByAlphabet(songList, 'name');
    //   //console.log(grouped);
    // }
  }, [songList, isSuccess]);

  const dispatch = useAppDispatch();
  const navigateToSongOptions = (song: SongDataWithCover) => {
    dispatch(
      setSelectedSong({
        name: song.name,
        artist: song.artist,
        album: song.album,
        releaseYear: 2017,
        genre: 'j-rock',
        lang: 'jp',
        time: song.duration,
        previewTime: song.previewStart,
        isScoreModeSupported: false,
        lyrics: [],
        coverUrl: song.coverImage,
        apiSongId: song.id,
      }),
    );
    navigate('/songOptions');
  };

  if (isSuccess && songsWithCovers.length === songList.length)
    return (
      <Container>
        <PageTitleContainer>
          <PageTitle>Biblioteka piosenek</PageTitle>
        </PageTitleContainer>
        <SongsContainer>
          {groupByAlphabet(songsWithCovers, 'name').map((group) => (
            <SongGroupContainer key={group.groupId}>
              <GroupNameContainer>
                <GroupName>{group.groupId}</GroupName>
              </GroupNameContainer>
              <SongTableContainer>
                <SongTable>
                  {group.songs.map((item: SongDataWithCover) => (
                    <SongCard
                      name={item.name}
                      artist={item.artist}
                      coverImg={item.coverImage}
                      key={item.dirname}
                      onClick={() => navigateToSongOptions(item)}
                    />
                  ))}
                </SongTable>
              </SongTableContainer>
            </SongGroupContainer>
          ))}
        </SongsContainer>
      </Container>
    );

  return <></>;
}

export default SongSelect;
