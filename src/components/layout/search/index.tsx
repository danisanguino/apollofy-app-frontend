import { ChangeEvent, useEffect, useState } from "react";
import "./search.css";
import { getTracks } from "../../../utils/functions";
import { Track } from "../../../utils/interfaces/track";

type Props = {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
};

export default function Search({}: Props) {
  const [searched, setSearched] = useState("");
  const [tracks, setTracks] = useState([] as Track[]);

  useEffect(() => {
    async function setTracksAPI() {
      const TracksAPI = await getTracks();
      setTracks(TracksAPI);
    }
    setTracksAPI();
  }, []);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setSearched(ev.target.value);
  };

  const resultsArtist = tracks.filter((track) => {
    return (
      // searched && track.artist.toLowerCase().includes(searched.toLowerCase())
      (searched &&
        track.artist.toLowerCase().includes(searched.toLowerCase())) ||
      (searched && track.name.toLowerCase().includes(searched.toLowerCase()))
    );
  });
  console.log(resultsArtist);

  return (
    <input
      className="search"
      placeholder="Search"
      value={searched}
      onChange={handleChange}
    />
  );
}
