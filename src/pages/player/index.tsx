import Page from '../../components/layout/page';
import './player.css';
import { useSongContext } from '../../context/useSongContext';
import { useUserContext } from '../../context/useUserContext';
import { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';

type Props = {};

export function Player({}: Props) {
  const { isPlaying, setIsPlaying, currentSong, volume, setVolume, audio } =
    useSongContext();
  const duration = audio?.duration ?? 0;
  const [currentTime, setCurrentTime] = useState(0);
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

  useEffect(() => {
    audio?.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  function handleTimeUpdate() {
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  }

  function formatTime(time: number) {
    if (time === 0) {
      return '0:00';
    } else {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60)
        .toString()
        .padStart(2, '0');

      return `${min}:${sec}`;
    }
  }

  function handleVolume() {
    if (volume === 0) {
      setVolume(0.6);
    } else {
      setVolume(0);
    }
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
          <div className="slider-section">
            <span>{formatTime(currentTime)}</span>
            <Slider
              min={0}
              max={duration}
              value={[currentTime]}
              className="track-song"
              onValueChange={(value) => {
                const [newValue] = value;
                if (audio) {
                  audio.currentTime = newValue;
                }
                setCurrentTime(newValue);
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </section>
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
          <button onClick={handleVolume}>
            {volume === 0 ? (
              <img src="/images/player/speaker-mute.svg" />
            ) : (
              <img src="/images/player/speaker-wave-1-svgrepo-com.svg" />
            )}
          </button>
          <Slider
            defaultValue={[volume * 100]}
            max={100}
            min={0}
            value={[volume * 100]}
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
