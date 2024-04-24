import { Artist } from "./artist";
import { Genre } from "./genre";

export interface Track {
  id: string;
  title: string;
  artist: Artist;
  artistId: string,
  url: string;
  thumbnail: string;
  new: boolean;
  genres: Genre[];
  genresId: string[];
  likes: number;
  createdAt: Date,
  updatedAt: Date
}

