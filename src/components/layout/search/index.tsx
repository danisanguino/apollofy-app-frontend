import { ChangeEvent, useEffect, useState } from 'react';
import './search.css';
import { getArtist, getTracks } from '@/utils/functions';
import { Track } from '@/utils/interfaces/track';
import { Artist } from '@/utils/interfaces/artist';
import { useUserContext } from '@/context/useUserContext';
import { useAuth0 } from '@auth0/auth0-react';

type Props = {
  setShowSearch: Function;
};

export default function Search(props: Props) {
  const [searched, setSearched] = useState('');
  const [tracks, setTracks] = useState([] as Track[]);
  const [artists, setArtists] = useState([] as Artist[]);
  const user = useUserContext();
  const { getAccessTokenSilently } = useAuth0();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setSearched(ev.target.value);
    search(ev.target.value);
  };

  useEffect(() => {
    async function setDataAPI() {
      const TracksAPI = await getTracks(getAccessTokenSilently);
      const ArtistsAPI = await getArtist(getAccessTokenSilently);
      setTracks(TracksAPI.data);
      setArtists(ArtistsAPI.data);
    }
    setDataAPI();
  }, [user.user]);

  function search(params: string) {
    const resultsSearchTracks = tracks.filter((track) => {
      return params && track.title.toLowerCase().includes(params.toLowerCase());
    });

    const resultsSearchArtist = artists.filter((artist) => {
      return params && artist.name.toLowerCase().includes(params.toLowerCase());
    });
    props.setShowSearch({
      tracks: resultsSearchTracks,
      artists: resultsSearchArtist,
    });
  }

  return (
    <input
      type="search"
      className="search"
      placeholder="Search"
      value={searched}
      onChange={handleChange}
    />
  );
}
