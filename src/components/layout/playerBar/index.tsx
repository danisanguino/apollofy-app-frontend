import "./playerBar.css";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSongContext } from "../../../context/useSongContext";
import { SmallCard } from "@/components/global/smallCard";
import { Slider } from "@/components/ui/slider";
import { formatTime, getArtist } from "@/utils/functions";
import { Artist } from "@/utils/interfaces/artist";
// import { useAuth0 } from "@auth0/auth0-react";

const Play = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M41.2772 29.5695L24.5662 39.7771C23.5581 40.3829 22.2444 39.6862 22.2444 38.5049L22 19.5436C22 18.3926 23.222 17.6354 24.2302 18.1806L41.1855 26.9646C42.2242 27.5098 42.2853 28.994 41.2772 29.5998V29.5695Z"
      fill="#FFFFFF"
    />
  </svg>
);

const Pause = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 58 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.7086 17H23.8762C25.3701 17 26.5848 18.2147 26.5848 19.7086V38.0268C26.5848 39.5207 25.3701 40.7354 23.8762 40.7354H23.7086C22.2147 40.7354 21 39.5207 21 38.0268V19.7226C21 18.2287 22.2147 17.014 23.7086 17.014V17Z"
      fill="#FFFFFF"
    />
    <path
      d="M34.8782 17H35.0457C36.5397 17 37.7544 18.2147 37.7544 19.7086V38.0268C37.7544 39.5207 36.5397 40.7354 35.0457 40.7354H34.8782C33.3843 40.7354 32.1696 39.5207 32.1696 38.0268V19.7226C32.1696 18.2287 33.3843 17.014 34.8782 17.014V17Z"
      fill="#FFFFFF"
    />
  </svg>
);

export function PlayerBar() {
  const { isPlaying, setIsPlaying, currentSong, volume, setVolume, setAudio } =
    useSongContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  function handleClick() {
    setIsPlaying(!isPlaying);
  }
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  // const { getAccessTokenSilently } = useAuth0();
  const { getAccessTokenSilently } = useSongContext();

  const [artists, setArtists] = useState([] as Artist[]);
  const currentArtist = artists.find((a) => {
    if (currentSong.title) {
      return a.id === currentSong.artist[0].artistId;
    }
  });

  useEffect(() => {
    async function setDataAPI() {
      const ArtistsAPI = await getArtist(getAccessTokenSilently);
      setArtists(ArtistsAPI.data);
    }
    setDataAPI();
  }, []);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  function handleTimeUpdate() {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  function handleVolume() {
    if (volume === 0) {
      setVolume(0.6);
    } else {
      setVolume(0);
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      setAudio(audioRef.current);
      setDuration(audioRef.current.duration);
    }
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.url;
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <Outlet />
      {currentSong.title && (
        <section className="player-bar">
          <div className="song-info">
            <Link to={"/player"}>
              <SmallCard
                src={currentSong.thumbnail}
                text1={currentSong.title}
                text2={currentArtist?.name || ""}
                class="song"
              />
            </Link>
          </div>
          <button className="player-btn" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </section>
      )}

      {/*PLAYERBAR LAPTOP*/}
      {currentSong.title && (
        <section className="section-bar-laptop">
          <div className="player-bar-laptop">
            <div className="song-info">
              <Link to={"/player"}>
                <SmallCard
                  src={currentSong.thumbnail}
                  text1={currentSong.title}
                  text2={currentArtist?.name || ""}
                  class="song"
                />
              </Link>
            </div>
            <div className="track-section">
              <button className="player-btn" onClick={handleClick}>
                {isPlaying ? <Pause /> : <Play />}
              </button>
              <div className="slider-section">
                <Slider
                  min={0}
                  max={duration}
                  value={[currentTime]}
                  className="track-song"
                  onValueChange={(value) => {
                    const [newValue] = value;
                    if (audioRef.current) {
                      audioRef.current.currentTime = newValue;
                    }
                    setCurrentTime(newValue);
                  }}
                />
              </div>
              <div className="time-section">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
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
          </div>
        </section>
      )}
      <audio ref={audioRef}></audio>
    </>
  );
}
