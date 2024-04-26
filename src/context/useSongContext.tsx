import { ReactNode, createContext, useContext, useState } from "react";
import { Track } from "../utils/interfaces/track";

interface SongContextType {
  isPlaying: boolean;
  setIsPlaying: Function;
  currentSong: Track;
  setCurrentSong: Function;
  volume: number;
  setVolume: Function;
  audio: HTMLAudioElement | null;
  setAudio: Function;
}

interface Props {
  children: ReactNode;
}

//Crear contexto
const SongContext = createContext({} as SongContextType);

//Crear provider
export function SongContextProvider(props: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({} as Track);
  const [volume, setVolume] = useState(0.6);
  const [audio, setAudio] = useState(null);

  return (
    <SongContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        currentSong,
        setCurrentSong,
        volume,
        setVolume,
        audio,
        setAudio,
      }}
    >
      {props.children}
    </SongContext.Provider>
  );
}

//Crear hook
export function useSongContext() {
  const context = useContext(SongContext);

  if (!context) {
    throw new Error(
      "useSongContext  must be used within a DataContextProvider"
    );
  }

  return context;
}
