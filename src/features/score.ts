import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ScoreState = {
  passed: number;
  all: number;
};

const initialState: ScoreState = {
  passed: 0,
  all: 0,
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore: (state, { payload }: PayloadAction<ScoreState>) => {
      state.passed = payload.passed;
      state.all = payload.all;
    },
  },
});

export const { setScore } = scoreSlice.actions;
export default scoreSlice.reducer;
