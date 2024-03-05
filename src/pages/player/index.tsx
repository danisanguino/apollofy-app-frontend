import Page from '../../components/layout/page';
import './player.css';
import { useSongContext } from '../../context/useSongContext';

type Props = {};

export function Player({}: Props) {
  const {isPlaying, setIsPlaying, currentSong} = useSongContext();
  function handleClickPlay() {
    setIsPlaying(!isPlaying);
  }

  return (
    <Page>
      <section className="player-section">
        <section className="songCard">
          <img className="songPhoto" src={currentSong.thumbnail} />
          <h2 className="songInfoTitle">{currentSong.name}</h2>
          <p className="songInfoArtist">{currentSong.artist}</p>
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
              <img src="src/assets/images/player/pause.svg" />
            ) : (
              <img src="src/assets/images/player/play.svg" />
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
