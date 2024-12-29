import React, { createContext, useState, useRef, useContext, useEffect } from 'react';

const AudioContext = createContext();

const songs = [
  '/Pokemon Cancion/Melodías Para el Recuerdo - 9 Nao Abandonada - Pokémon Rubí, Zafiro y Esmeralda.mp3',
  '/Pokemon Cancion/Música Ruta 117 Pokémon RubíZafiroEsmeralda.mp3',
  '/Pokemon Cancion/Pokemon Emerald Opening.mp3',
  '/Pokemon Cancion/Y2meta.app - Pokemon Ruby_Sapphire_Emerald- Littleroot Town (128 kbps).mp3'
];

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(new Audio(songs[currentSongIndex]));

  const currentSongPlaying = () => {
    audioRef.current.src = songs[currentSongIndex];
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const handleEnded = () => {
    playNextSong();
  };

  const updateProgress = () => {
    setProgress(audioRef.current.currentTime);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const handleVolumeChange = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const playPrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  useEffect(() => {
    currentSongPlaying();
    audioRef.current.addEventListener('ended', handleEnded);
    audioRef.current.addEventListener('timeupdate', updateProgress);

    return () => {
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentSongIndex, isPlaying]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        volume,
        togglePlay,
        setVolume: handleVolumeChange,
        playNextSong,
        playPrevSong,
        progress,
        duration: audioRef.current.duration,
        currentSong: songs[currentSongIndex],
        setProgress: handleProgressChange
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio debe ser usado dentro de AudioProvider');
  }
  return context;
};