import './playerBar.css';
import { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSongContext } from '../../../context/useSongContext';
import { useUserContext } from '@/context/useUserContext';
import { SmallCard } from '@/components/global/smallCard';

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
      fill="#E7C929"
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
      fill="#E7C929"
    />
    <path
      d="M34.8782 17H35.0457C36.5397 17 37.7544 18.2147 37.7544 19.7086V38.0268C37.7544 39.5207 36.5397 40.7354 35.0457 40.7354H34.8782C33.3843 40.7354 32.1696 39.5207 32.1696 38.0268V19.7226C32.1696 18.2287 33.3843 17.014 34.8782 17.014V17Z"
      fill="#E7C929"
    />
  </svg>
);

export function PlayerBar() {
  const { isPlaying, setIsPlaying, currentSong, volume } = useSongContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  function handleClick() {
    setIsPlaying(!isPlaying);
  }

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
      {currentSong.name && (
        <section className="player-bar">
          <div className="song-info">
            <Link to={'/player'}>
              <SmallCard
                src={currentSong.thumbnail}
                text1={currentSong.name}
                text2={currentSong.artist}
                class="song"
              />
            </Link>
          </div>
          <button className="player-btn" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <audio ref={audioRef}></audio>
        </section>
      )}
    </>
  );
}
