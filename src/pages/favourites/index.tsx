import { useEffect, useState } from 'react';
import Page from '../../components/layout/page';
import './favourites.css';
import { Track } from '../../utils/interfaces/track';
import { getTracks } from '../../utils/functions';
import { useUserContext } from '../../context/useUserContext';
import { useSongContext } from '../../context/useSongContext';
import { SmallCard } from '@/components/global/smallCard';

type Props = {};

export function Favourites({}: Props) {
  const [tracks, setTracks] = useState([] as Track[]);
  const user = useUserContext();
  const { setCurrentSong, setIsPlaying } = useSongContext();

  useEffect(() => {
    async function setTracksAPI() {
      const TracksAPI = await getTracks();
      setTracks(TracksAPI);
    }
    setTracksAPI();
  }, []);

  return (
    <Page>
      <section className="favourites-songs">
        <h2 className="favourite-title">I love them</h2>
        {user.user.myFavorites.map((track) => {
          const favTrack = tracks.find((t) => t.id === track)!;
          return (
            <SmallCard
              key={track}
              handleClick={() => {
                setCurrentSong(favTrack);
                setIsPlaying(true);
              }}
              src={favTrack?.thumbnail}
              text1={favTrack?.name}
              text2={favTrack?.artist}
            />
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
