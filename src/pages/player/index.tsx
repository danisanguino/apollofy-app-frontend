import Page from '../../components/layout/page';
import './player.css';
import { useSongContext } from '../../context/useSongContext';
import { useUserContext } from '../../context/useUserContext';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

type Props = {};

export function Player({}: Props) {
  const { isPlaying, setIsPlaying, currentSong, volume, setVolume, audio } =
    useSongContext();
  const [currentTime, setCurrentTime] = useState(0);
  const duration = audio?.duration ?? 0;
  const user = useUserContext();
  const favUser = user.user.myFavorites.includes(currentSong.id);
  const [isFav, setIsFav] = useState(favUser);

  function handleClickPlay() {
    setIsPlaying(!isPlaying);
  }
  function handleHeart() {
    const favs = user.user.myFavorites;
    if (isFav) {
      const index = user.user.myFavorites.indexOf(currentSong.id);
      favs.splice(index, 1);
    } else {
      favs.push(currentSong.id);
    }
    fetch(`http://localhost:3000/user/${user.user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        myFavorites: favs,
      }),
    });
    setIsFav(!isFav);
    localStorage.setItem('user', JSON.stringify(user.user));
  }

  return (
    <Page>
      <section className="player-section">
        <section className="songCard">
          <img className="songPhoto" src={currentSong.thumbnail} />
          <div className="songInfo">
            <div>
              <h2 className="songInfoTitle">{currentSong.name}</h2>
              <p className="songInfoArtist">{currentSong.artist}</p>
            </div>
            <button onClick={handleHeart}>
              {isFav ? (
                <img src="/images/heart-icon-2.svg" />
              ) : (
                <img src="/images/heart-icon-1.svg" />
              )}
            </button>
          </div>
        </section>
        <span>{currentTime}</span>
        <Slider
          max={audio?.duration}
          min={0}
          value={[currentTime]}
          onValueChange={(value) => {
            const [newValue] = value;
            if (audio) {
              audio.currentTime = newValue;
            }
            setCurrentTime(newValue);
          }}
        />
        <span>{duration}</span>
        <section className="playerSection">
          <button>
            <img src="/images/player/back.svg" />
          </button>
          <button>
            <img src="/images/player/rewind.svg" />
          </button>
          <button onClick={handleClickPlay}>
            {isPlaying ? (
              <img src="/images/player/pause.svg" />
            ) : (
              <img src="/images/player/play.svg" />
            )}
          </button>
          <button>
            <img src="/images/player/forward.svg" />
          </button>
          <button>
            <img src="/images/player/next.svg" />
          </button>
        </section>
        <div className="sliderContainer">
          <Slider
            defaultValue={[volume * 100]}
            max={100}
            min={0}
            className="slider"
            onValueChange={(value: number[]) => {
              const [newVol] = value;
              setVolume(newVol / 100);
            }}
          />
        </div>
      </section>
    </Page>
  );
}
