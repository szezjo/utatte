/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { Container } from './styles';

const Lyrics = ({ lyricsGroups, audioCurrentTime }) => {
  const FONTPADDING = 10;
  const MARGIN = 10;
  const TOPPADDING = 5;

  const canvasRef = useRef();
  const [data, setData] = useState(null);
  const [mfh, setMfh] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [fontSize, setFontSize] = useState(40);

  const [groupIndex, setGroupIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);

  const draw = useCallback(
    (ctx, lines, mfh) => {
      const canvas = ctx.canvas;
      //console.log(canvas.width);
      //console.log(canvas.height);
      ctx.restore();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `500 ${fontSize}px DM Sans`;
      ctx.lineWidth = 6;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'start';
      ctx.fillStyle = 'black';
      ctx.save();

      for (const line of lines) {
        for (const note of line) {
          const text = note.text;
          const fontWidth = note.fontWidth;
          const x = note.x;
          const y = note.y;
          const percentage = note.percentage;

          const border = (fontWidth * percentage) / 100;

          ctx.beginPath();
          ctx.rect(x, y, border, mfh + FONTPADDING);
          ctx.clip();

          ctx.strokeStyle = '#DDD';
          ctx.lineWidth = 6;
          ctx.strokeText(text, x, y + TOPPADDING);
          ctx.fillStyle = '#202020';
          ctx.fillText(text, x, y + TOPPADDING);

          ctx.restore();
          ctx.save();

          ctx.beginPath();
          ctx.rect(x + border, y, fontWidth - border, mfh + FONTPADDING);
          ctx.clip();

          ctx.strokeStyle = '#148EFF';
          ctx.lineWidth = 6;
          ctx.strokeText(text, x, y + TOPPADDING);
          ctx.fillStyle = 'white';
          ctx.fillText(text, x, y + TOPPADDING);

          ctx.restore();
          ctx.save();
        }
      }
    },
    [fontSize],
  );

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    setFontSize(ctx.canvas.width / 28);
    ctx.font = `500 ${fontSize}px DM Sans`;
    ctx.lineWidth = 6;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'start';
    ctx.fillStyle = 'black';
    ctx.save();

    const calculatedData = [];
    for (const group of lyricsGroups) {
      const newGroup = [];
      for (const line of group) {
        const newLine = [];
        for (const note of line) {
          const metrics = ctx.measureText(note.text);
          const fontWidth = metrics.width;
          const fontHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

          newLine.push({
            text: note.text,
            time: note.noteTime,
            duration: note.noteDuration,
            fontWidth: fontWidth,
            fontHeight: fontHeight,
            percentage: 0,
          });
        }
        newGroup.push(newLine);
      }
      calculatedData.push(newGroup);
    }

    let maxFontHeight = 0;
    for (const group of calculatedData) {
      for (const line of group) {
        for (const note of line) {
          if (note.fontHeight > maxFontHeight) {
            maxFontHeight = note.fontHeight;
          }
        }
      }
    }

    for (const group of calculatedData) {
      for (let i = 0; i < group.length; i++) {
        const y = i * (maxFontHeight + FONTPADDING + MARGIN);
        for (const note of group[i]) {
          note.y = y;
        }
      }
    }

    for (const group of calculatedData) {
      for (const line of group) {
        for (let i = 0; i < line.length; i++) {
          let x = 0;
          for (let j = 0; j < i; j++) {
            x += line[j].fontWidth;
          }
          line[i].x = x;
        }
      }
    }

    setMfh(maxFontHeight);
    setData(calculatedData);
  }, [lyricsGroups, fontSize]);

  useLayoutEffect(() => {
    if (data && !isFinished) {
      const ctx = canvasRef.current.getContext('2d');

      const activeNote = data[groupIndex][lineIndex][noteIndex];
      const time = audioCurrentTime;
      if (time >= activeNote.time && time < activeNote.time + activeNote.duration) {
        activeNote.percentage = ((time - activeNote.time) / activeNote.duration) * 100;
      } else if (time >= activeNote.time + activeNote.duration) {
        activeNote.percentage = 100;
        if (noteIndex + 1 >= data[groupIndex][lineIndex].length) {
          setNoteIndex(0);
          if (lineIndex + 1 >= data[groupIndex].length) {
            setLineIndex(0);
            if (groupIndex + 1 >= data.length) {
              setIsFinished(() => true);
            } else setGroupIndex((groupIndex) => groupIndex + 1);
          } else setLineIndex((lineIndex) => lineIndex + 1);
        } else setNoteIndex((noteIndex) => noteIndex + 1);
      }

      draw(ctx, data[groupIndex], mfh);
    }
    if (isFinished) return;
  }, [audioCurrentTime, data, draw, groupIndex, lineIndex, noteIndex, mfh, isFinished]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const handleResize = (e) => {
      ctx.canvas.height = 300;
      ctx.canvas.width = window.innerWidth - 100;
    };

    handleResize();

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

export default Lyrics;
