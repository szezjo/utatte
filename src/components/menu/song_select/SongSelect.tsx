import React, { useEffect, useState } from 'react';
import SongCard from './song_card/SongCard';
import { useGetSongsListQuery } from '../../../api';
import { SongData } from '../../../types';

const address = import.meta.env.VITE_SERVER_ADDRESS;

function SongSelect() {
  const { data: songList, isLoading, isSuccess, isError, error } = useGetSongsListQuery();
  const [coverImages, setCoverImages] = useState<string[]>([]);
  if (isLoading) console.log('loading');
  if (isSuccess) console.log(songList);
  if (isError) console.error(error);

  const fetchImage = async (imageUrl: string) => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    if (imageBlob.type !== 'image/jpeg') return '/no_cover.jpg';
    const imageObjectUrl = URL.createObjectURL(imageBlob);
    return imageObjectUrl;
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (isSuccess) {
        const images = songList.map((item: SongData) => {
          const res = fetchImage(`${address}/getCoverImage/${item.id}`);
          return res;
        });
        Promise.all(images).then((values) => setCoverImages(values));
      }
    };

    fetchImages();
  }, [songList, isSuccess]);

  if (isSuccess && coverImages.length === songList.length)
    return (
      <>
        {songList.map((item: SongData, index: number) => (
          <SongCard name={item.name} artist={item.artist} coverImg={coverImages[index]} key={item.dirname} />
        ))}
      </>
    );

  return <></>;
}

export default SongSelect;
