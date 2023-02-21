import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/rtkHooks';

import { setupAudio } from '../../utils/setupAudio';
import Core from './core';

function PreSetup() {
  const [audio, setAudio] = useState(undefined);
  const [pitch, setPitch] = useState(undefined);

  const [videoFile, setVideoFile] = useState('');
  const [data, setData] = useState({});

  const { audioFile, apiSongId } = useAppSelector((state) => state.songPlayer);
  const address = import.meta.env.VITE_SERVER_ADDRESS;

  useEffect(() => {
    const setup = async () => {
      setAudio(await setupAudio(setPitch));
    };

    setup();
  }, []);

  useEffect(() => {
    if (!apiSongId) return;

    const fetchVideo = async () => {
      const videoUrl = `${address}/getVideo/${apiSongId}`;
      const res = await fetch(videoUrl);
      const videoBlob = await res.blob();
      const videoObjectUrl = URL.createObjectURL(videoBlob);

      setVideoFile(videoObjectUrl);
    };

    const fetchData = async () => {
      const dataUrl = `${address}/getSongData/${apiSongId}`;
      const res = await fetch(dataUrl);
      const jsonData = await res.json();

      setData(jsonData);
    };

    fetchVideo();
    fetchData();
  }, [apiSongId]);

  // useEffect(() => {
  //   console.log('data', data);
  //   console.log(!!audio, !!videoFile.length, !!audioFile, !!data, !!Object.keys(data).length);
  // }, [audio, pitch, audioFile, videoFile, data]);

  if (audio && audioFile && !!videoFile.length && data.lyrics && !!Object.keys(data).length)
    return <Core audioFile={audioFile} videoFile={videoFile} data={data} pitch={pitch} />;
  else return <p style={{ color: '#000' }}>Ładowanie</p>;
}

export default PreSetup;
