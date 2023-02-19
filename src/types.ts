export type SongData = {
  id: number;
  name: string;
  artist: string;
  album: string;
  dirname: string;
  romajiName: string;
  romajiArtist: string;
  romajiAlbum: string;
  duration: number;
  previewStart: number;
};

export type SourceData = {
  source: string;
  previewTime: number;
};
