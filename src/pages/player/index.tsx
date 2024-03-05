import { useEffect, useState } from 'react';
import Page from '../../components/layout/page';
import './player.css';
import { useParams } from 'react-router-dom';
import { getTracks } from '../../utils/functions';
import { Track } from '../../utils/interfaces/track';

type Props = {};

export function Player({}: Props) {
  const { id } = useParams();
  const [tracks, setTracks] = useState([] as Track[]);
  const currentTrack = tracks.find((t) => t.id === id);
  const [isPlaying, setIsPlaying] = useState(false);
  function handleClickPlay() {
    setIsPlaying(!isPlaying);
  }
  useEffect(() => {
    async function setTracksAPI() {
      const TracksAPI = await getTracks();
      setTracks(TracksAPI);
    }
    setTracksAPI();
  }, []);
  return (
    <Page>
      <section className="player-section">
        <section className="songCard">
          <img className="songPhoto" src={currentTrack?.thumbnail} />
          <h2 className="songInfoTitle">{currentTrack?.name}</h2>
          <p className="songInfoArtist">{currentTrack?.artist}</p>
        </section>
        <section className="playerSection">
          <button>
            <img src="src/assets/images/player/back.svg" />
          </button>
          <button>
            <img src="src/assets/images/player/rewind.svg" />
          </button>
          <button onClick={handleClickPlay}>
            {isPlaying ? (
              <img src="src/assets/images/player/play.svg" />
            ) : (
              <img src="src/assets/images/player/pause.svg" />
            )}
          </button>
          <button>
            <img src="src/assets/images/player/forward.svg" />
          </button>
          <button>
            <img src="src/assets/images/player/next.svg" />
          </button>
        </section>
      </section>
    </Page>
  );
}
