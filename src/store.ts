import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { combineReducers } from 'redux';
import { api } from './api';
import scoreReducer from './features/score';
import songPlayerReducer from './features/songPlayer';
import songSelectReducer from './features/songSelect';

const rootReducer = combineReducers({
  songSelect: songSelectReducer,
  songPlayer: songPlayerReducer,
  score: scoreReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
