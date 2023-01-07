import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SongData } from '../types';

const address = import.meta.env.VITE_SERVER_ADDRESS;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${address}/` }),
  endpoints: (builder) => ({
    getSongsList: builder.query<SongData[], void>({
      query: () => 'listSongs',
    }),
  }),
});

export const { useGetSongsListQuery } = api;
