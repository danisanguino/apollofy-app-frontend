import { useEffect, useState } from 'react';
import Page from '../../components/layout/page';
import './favourites.css';
import { Track } from '../../utils/interfaces/track';
import { getArtist, getTracks } from '../../utils/functions';
import { useUserContext } from '../../context/useUserContext';
import { useSongContext } from '../../context/useSongContext';
import { SmallCard } from '@/components/global/smallCard';
import { useAuth0 } from '@auth0/auth0-react';
import { Artist } from '@/utils/interfaces/artist';

type Props = {};

export function Favourites({}: Props) {
  const [tracks, setTracks] = useState([] as Track[]);
  const [artists, setArtists] = useState([] as Artist[]);
  const user = useUserContext();
  const { setCurrentSong, setIsPlaying } = useSongContext();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function setTracksAPI() {
      const TracksAPI = await getTracks(getAccessTokenSilently);
      const ArtistsAPI = await getArtist(getAccessTokenSilently);
      setTracks(TracksAPI.data);
      setArtists(ArtistsAPI.data);
    }
    setTracksAPI();
  }, []);

  return (
    <Page>
      <section className="favourites-songs">
        <h2 className="favourite-title">I love them</h2>
        {user.user?.myFavorites.map((track: string) => {
          const favTrack = tracks.find((t) => t.id === track)!;
          console.log('🚀 ~ {user.user?.myFavorites.map ~ favTrack:', favTrack);
          const artist = artists.find((a) => {
            return a.id === favTrack.artist[0].artistId;
          });
          return (
            <div key={track} className="fav-container">
              <SmallCard
                key={track}
                handleClick={() => {
                  setCurrentSong(favTrack);
                  setIsPlaying(true);
                }}
                src={favTrack?.thumbnail}
                text1={favTrack?.title}
                text2={artist?.name || ''}
                text3="3:15"
              />
            </div>
          );
        })}
      </section>
    </Page>
  );
}

// <button key={track} onClick={() => {
//   setCurrentSong(favTrack);
//     setIsPlaying(true);
//   }}>
//   <div className="song-card">
//     <img className="img-song" src={favTrack?.thumbnail} />
//     <div className="song-info">
//       <h3>{favTrack?.name}</h3>
//       <p>{favTrack?.artist}</p>
//     </div>
//   </div>
// </button>
