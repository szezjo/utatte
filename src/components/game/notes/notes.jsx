/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import { Container } from './styles';
import { setScore as setFinalScore } from '../../../features/score';

const MAGNIFIER = 250;

const Notes = ({ lyricsGroups, audioCurrentTime, pitch, audioDuration, greatPointThreshold, goodPointThreshold }) => {
  const canvasRef = useRef();
  const [data, setData] = useState(null);
  const [min, setMin] = useState(0);
  const [scale, setScale] = useState(0);
  const [currentNote, setCurrentNote] = useState(0);
  const [songPitch, setSongPitch] = useState(0);
  const [modifiedPitch, setModifiedPitch] = useState(0);

  const [score, setScore] = useState({ current: 0, all: 0 });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const freqToMidi = (f) => {
    const mathlog2 = Math.log(f / 440) / Math.log(2);
    return Math.round(12 * mathlog2) + 69;
  };

  const calculateScale = (data) => {
    let min = 110;
    let max = 20;

    for (const n of data) {
      const note = parseInt(n.note);
      if (note < min) min = note;
      if (note > max) max = note;
    }

    let scale = max - min + 1;
    while (scale < 20) {
      min -= 1;
      max += 1;
      scale += 2;
    }

    return [min, max, scale];
  };

  const drawLine = (note, len, pos, time, min, scale, ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const lineSize = height / scale; // To make sure that all lines will have equal size and all lines would fill the canvas
    const lineIndex = scale + min - 1 - note; // The highest note will be 0, the lowest the last index.
    const posDiff = pos - time; // If less than 0, part of the note will be on left of bar.
    const barPosition = width / 5; // Bar should always be on the left side of the canvas. Bar shows the current position of the song.

    let x = barPosition + posDiff; // Position x of the note on canvas.
    const y = lineSize * lineIndex; // Position y of the note on canvas.

    let leftLen;
    let rightLen = len;

    // If posDiff is smaller than 0, first draw part on the left of a bar and then draw the rest.
    if (posDiff < 0) {
      rightLen = posDiff + len > 0 ? len + posDiff : 0;
      leftLen = len - rightLen;
      ctx.fillStyle = '#FFF';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#FFF';
      ctx.fillRect(x, y, leftLen, lineSize);
      x = barPosition;
    }

    ctx.fillStyle = '#148EFF';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#148EFF';
    ctx.fillRect(x, y, rightLen, lineSize);
  };

  const drawPitch = (note, min, scale, ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const lineSize = height / scale;
    const lineIndex = scale + min - 1 - note;
    const position = width / 5;
    const y = lineSize * lineIndex;

    ctx.fillStyle = 'yellow';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#FFF';
    ctx.lineWidth = 30;
    ctx.fillRect(position, y, 50, lineSize);
  };

  const drawNotes = useCallback((ctx, data, time, min, scale) => {
    for (const n of data) {
      drawLine(n.note, n.noteDuration * MAGNIFIER, n.noteTime * MAGNIFIER, time * MAGNIFIER, min, scale, ctx);
    }
  }, []);

  const getDataFromGroups = (lyricsGroups) => {
    const data = [];
    for (const group of lyricsGroups) {
      for (const line of group) {
        for (const note of line) {
          if (note.isSpace === false && note.note) data.push(note);
        }
      }
    }
    return data;
  };

  const end = (_score) => {
    dispatch(setFinalScore({ passed: _score.current, all: _score.all }));
    navigate('/end');
  };

  useEffect(() => {
    if (data) {
      const cNote = data[currentNote];
      const len = data.length;
      if (audioCurrentTime >= cNote.noteTime && audioCurrentTime < cNote.noteTime + cNote.noteDuration) {
        if (cNote.note !== songPitch) setSongPitch(cNote.note);
      }
      if (audioCurrentTime >= cNote.noteTime + cNote.noteDuration) {
        if (currentNote + 1 < len) {
          setCurrentNote((currentNote) => currentNote + 1);
        }
        if (songPitch !== 0) setSongPitch(0);
      }
    }

    console.log(audioCurrentTime, audioDuration);
    if (audioCurrentTime >= audioDuration) {
      end(score);
    }
  }, [data, audioCurrentTime]);

  useEffect(() => {
    console.log(songPitch);
  }, [songPitch]);

  useEffect(() => {
    let midiValue = freqToMidi(Math.round(pitch || 0));
    let timeout = 0;
    if (songPitch != 0)
      while (Math.abs(songPitch - midiValue) > 6 && timeout < 3) {
        if (midiValue < songPitch) midiValue += 12;
        else if (midiValue > songPitch) midiValue -= 12;
        timeout++;
      }
    // console.log(`${oldMidiValue} ${midiValue}`);
    setModifiedPitch(midiValue);

    // if (Math.abs(songPitch - midiValue) === 1) console.log('half point');
    // else if (Math.abs(songPitch - midiValue) === 0) console.log('full point');
  }, [pitch, songPitch]);

  useEffect(() => {
    if (songPitch != 0 && modifiedPitch) {
      let newScore = score.current;
      if (Math.abs(songPitch - modifiedPitch) <= greatPointThreshold) {
        newScore += 1;
      } else if (Math.abs(songPitch - modifiedPitch) <= goodPointThreshold) {
        newScore += 0.5;
      }

      const newAllPoints = score.all + 1;
      setScore({ current: newScore, all: newAllPoints });
      console.log(newScore, newAllPoints);
    }
  }, [audioCurrentTime, songPitch, modifiedPitch]);

  useEffect(() => {
    setData(getDataFromGroups(lyricsGroups));
  }, [lyricsGroups]);

  useEffect(() => {
    if (data) {
      const [min, _, scale] = calculateScale(data);
      setMin(min);
      setScale(scale);
      //   console.log(data);
    }
  }, [data]);

  const drawScore = (_score, ctx) => {
    const canvas = ctx.canvas;

    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.font = 'italic 40px Arial';
    ctx.fillStyle = '#FFF5';
    //ctx.fillText(`${(100 * _score.current) / _score.all}`, canvas.width, canvas.height);
    ctx.fillText(`${_score.current * 10}`, canvas.width, canvas.height);
  };

  useLayoutEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const canvas = ctx.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#292834EE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawScore(score, ctx);
    if (data) drawNotes(ctx, data, audioCurrentTime, min, scale);
    ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#148EFF';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 5, 0);
    ctx.lineTo(canvas.width / 5, canvas.height);
    ctx.closePath();
    ctx.stroke();
    // console.log(`${modifiedPitch}`);
    drawPitch(modifiedPitch, min, scale, ctx);
  }, [audioCurrentTime, data, drawNotes, min, scale, modifiedPitch]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const handleResize = (e) => {
      ctx.canvas.height = 200;
      ctx.canvas.width = window.innerWidth;
    };

    handleResize();

    ctx.fillStyle = '#555';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <canvas ref={canvasRef}></canvas>
    </Container>
  );
};

export default Notes;
