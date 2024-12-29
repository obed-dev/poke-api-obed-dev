import React from 'react';
import { useAudio } from '../components/AudioProvider';
import volumeIcon from '../assets/images/alto-volumen.png';
import '../AudioControls.css';

export const AudioControls = () => {
  const { isPlaying, volume, 
    togglePlay,
    setVolume ,
    playNextSong,
    playPrevSong ,
    progress ,
    duration ,
    currentSong ,
    setProgress} = useAudio();

  return (
    <div className="controls-container">
      <button className="button" onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

     <div>
      <img src={volumeIcon} alt="volume-icon"  className="volume-icon"/>
      <input
      className="volume-slider"
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      onChange={(e) => setVolume(Number(e.target.value))}
      />
      </div> 

       <div>

      <button className="button" onClick={playPrevSong} > Prev </button>
      <button className="button" onClick={playNextSong} > Next  </button>
       </div>

       <div className="song-info">
        <p>{currentSong.split('/').pop()}</p>
        <input
          className="progress-slider"
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

