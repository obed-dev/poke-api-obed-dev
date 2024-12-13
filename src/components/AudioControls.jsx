import React from 'react';
import { useAudio } from '../components/AudioProvider';

export const AudioControls = () => {
  const { isPlaying, volume, togglePlay, setVolume } = useAudio();

  return (
    <div>
      <button onClick={togglePlay}>
        {isPlaying ? 'Pausar' : 'Reproducir'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
    </div>
  );
};

