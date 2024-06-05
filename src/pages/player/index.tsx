import Page from "../../components/layout/page";
import "./player.css";
import { useSongContext } from "../../context/useSongContext";
import { useUserContext } from "../../context/useUserContext";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Track } from "@/utils/interfaces/track";
import {
  formatTime,
  getArtist,
  getTracks,
  updateFavorites,
} from "@/utils/functions";
// import { useAuth0 } from '@auth0/auth0-react';
import { Artist } from "@/utils/interfaces/artist";

type Props = {};

export function Player({}: Props) {
  const { isPlaying, setIsPlaying, currentSong, volume, setVolume, audio } =
    useSongContext();
  const duration = audio?.duration ?? 0;
  const [currentTime, setCurrentTime] = useState(0);
  const user = useUserContext();
  const favUser = user.user?.myFavorites.includes(currentSong.id);
  const [isFav, setIsFav] = useState(favUser);
  const [tracks, setTracks] = useState([] as Track[]);
  const [relatedSongs, setRelatedSongs] = useState([] as Track[]);
  // const { getAccessTokenSilently } = useAuth0();
  const { getAccessTokenSilently } = useSongContext();
  const [artists, setArtists] = useState([] as Artist[]);
  const currentArtist = artists.find((a) => {
    return a.id === currentSong.artist[0].artistId;
  });

  useEffect(() => {
    async function setDataAPI() {
      const TracksAPI = await getTracks(getAccessTokenSilently);
      const ArtistsAPI = await getArtist(getAccessTokenSilently);
      setTracks(TracksAPI.data);
      setArtists(ArtistsAPI.data);
    }
    setDataAPI();
  }, []);

  useEffect(() => {
    const relatedSongs = tracks.filter((t) => {
      let includes = false;
      currentSong.genres.map((g) => {
        t.genres.forEach((tg) => {
          if (tg.genreId === g.genreId && t.title !== currentSong.title) {
            includes = true;
          }
        });
      });
      if (includes) {
        return t;
      }
    });
    setRelatedSongs(relatedSongs);
  }, [tracks]);

  function handleClickPlay() {
    setIsPlaying(!isPlaying);
  }

  function handleHeart() {
    const favs = user.user?.myFavorites;
    if (isFav) {
      const index = user.user?.myFavorites.indexOf(currentSong.id);
      favs.splice(index, 1);
    } else {
      favs.push(currentSong.id);
    }
    async function updating() {
      const userUpdated = await updateFavorites(
        getAccessTokenSilently,
        favs,
        user.user?.id
      );
      user.setUser(userUpdated);
    }
    updating();
    setIsFav(!isFav);
    localStorage.setItem("user", JSON.stringify(user.user));
  }

  useEffect(() => {
    audio?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  function handleTimeUpdate() {
    if (audio) {
      setCurrentTime(audio.currentTime);
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
              <h2 className="songInfoTitle">{currentSong.title}</h2>
              <p className="songInfoArtist">{currentArtist?.name || ""}</p>
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
            <div className="time-section">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
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

      {/*PLAYER-SONG LAPTOP*/}
      <section className="player-section-laptop">
        <section className="songCard-laptop">
          <img className="songPhoto" src={currentSong.thumbnail} />
          <div className="songInfo">
            <div className="songInfoDetail">
              <h2 className="songInfoTitle">{currentSong.title}</h2>
              <span className="songInfoArtist">
                {currentArtist?.name || ""}{" "}
              </span>
              <span className="songInfoDuration">
                Duration {formatTime(duration)}
              </span>
              <button className="songInfoHeart" onClick={handleHeart}>
                {isFav ? (
                  <img src="/images/heart-icon-2.svg" />
                ) : (
                  <img src="/images/heart-icon-1.svg" />
                )}
              </button>
            </div>
          </div>
        </section>
      </section>

      {relatedSongs.length > 0 && (
        <section className="related-songs">
          <h3 className="title-related">Related Songs</h3>
          <div className="container-related">
            {relatedSongs.map((song) => {
              return (
                <div key={song.id} className="related-info">
                  <img src={song.thumbnail} />
                  <p>{song.title}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </Page>
  );
}
