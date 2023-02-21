import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Lyrics from './lyrics';
import Notes from './notes';

import { Body, VideoFeed } from './styles';
import { useAppSelector } from '../../hooks/rtkHooks';

const path = 'spiderman';
const Core = ({ audioFile, videoFile, data, pitch }) => {
  const audioRef = useRef();
  const videoRef = useRef();
  const [audioStartTime, setAudioStartTime] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0.0);
  const [duration, setDuration] = useState(NaN);

  const { freeMode: forceFreeMode } = useAppSelector((state) => state.songPlayer);

  //   const [lyrics, setLyrics] = useState(null);
  //   const [freeMode, setFreeMode] = useState(false);

  const requestRef = useRef();

  const update = () => {
    const cTime = audioRef.current ? audioRef.current.currentTime - audioStartTime : 0;
    setAudioCurrentTime(cTime);
    if (!duration) setDuration(audioRef.current.duration);
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    setAudioStartTime(audioRef.current.currentTime);
    audioRef.current.play();
    videoRef.current.play();
    document.documentElement.requestFullscreen();
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <>
      <audio ref={audioRef} preload="none">
        <track kind="captions" />
        <source src={audioFile} type="audio/ogg" />
      </audio>
      <VideoFeed ref={videoRef} muted>
        <source src={videoFile} type="video/webm" />
      </VideoFeed>
      <Body>
        {data.lyrics && (
          <>
            {!forceFreeMode && (
              <Notes
                lyricsGroups={data.lyrics}
                audioCurrentTime={audioCurrentTime}
                pitch={pitch}
                audioDuration={duration}
                greatPointThreshold={0}
                goodPointThreshold={1}
              />
            )}
            <Lyrics lyricsGroups={data.lyrics} audioCurrentTime={audioCurrentTime} />
          </>
        )}
      </Body>
    </>
  );
};

Core.propTypes = {
  audioFile: PropTypes.string,
  videoFile: PropTypes.string,
  data: PropTypes.object,
  pitch: PropTypes.number,
};

export default Core;
