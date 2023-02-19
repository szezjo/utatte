import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type SongSelectState = {
  name: string;
  artist: string;
  album: string;
  releaseYear: number;
  genre: string;
  lang: string;
  time: number;
  previewTime: number;
  isScoreModeSupported: boolean;
  lyrics: string[];
  coverUrl: string;
  apiSongId: number;
};

const initialState: SongSelectState = {
  name: '',
  artist: '',
  album: '',
  releaseYear: 0,
  genre: '',
  lang: '',
  time: 0,
  previewTime: 0,
  isScoreModeSupported: false,
  lyrics: [],
  coverUrl: '',
  apiSongId: -1,
};

const songSelectSlice = createSlice({
  name: 'songSelect',
  initialState: initialState,
  reducers: {
    setSelectedSong: (state, { payload }: PayloadAction<SongSelectState>) => {
      state.name = payload.name;
      state.album = payload.album;
      state.artist = payload.artist;
      state.releaseYear = payload.releaseYear;
      state.genre = payload.genre;
      state.lang = payload.lang;
      state.time = payload.time;
      state.previewTime = payload.previewTime;
      state.isScoreModeSupported = payload.isScoreModeSupported;
      state.lyrics = payload.lyrics;
      state.coverUrl = payload.coverUrl;
      state.apiSongId = payload.apiSongId;
    },
  },
});

export const { setSelectedSong } = songSelectSlice.actions;
export default songSelectSlice.reducer;
