export interface Track {
  id: string;
  name: string;
  artist: string;
  url: string;
  thumbnail: string;
  new: boolean;
  genre: string[];
  liked: boolean;
}
