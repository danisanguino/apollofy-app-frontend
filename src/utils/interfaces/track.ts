import { ArtistTrack } from './artistTrack';
import { GenreTrack } from './genreTrack';

export interface Track {
  id: string;
  title: string;
  artist: ArtistTrack[];
  artistId: string;
  url: string;
  thumbnail: string;
  new: boolean;
  genres: GenreTrack[];
  genresId: string[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
