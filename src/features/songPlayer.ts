import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type SongPlayerState = {
  audioFile: string;
  apiSongId: number;
  freeMode: boolean;
};

const initialState: SongPlayerState = {
  audioFile: '',
  apiSongId: -1,
  freeMode: false,
};

const songPlayerSlice = createSlice({
  name: 'songPlayer',
  initialState,
  reducers: {
    setPlayingSong: (state, { payload }: PayloadAction<SongPlayerState>) => {
      state.audioFile = payload.audioFile;
      state.apiSongId = payload.apiSongId;
      state.freeMode = payload.freeMode;
    },
  },
});

export const { setPlayingSong } = songPlayerSlice.actions;
export default songPlayerSlice.reducer;
