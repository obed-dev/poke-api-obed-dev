import React , {useEffect}   from 'react';
import useSound from "use-sound";
import pokemonSong from "./assets/Pokemon Cancion/Y2meta.app - Pokemon Ruby_Sapphire_Emerald- Littleroot Town (128 kbps).mp3";

const BackgroundMusic = () => {
  const [playSound] = useSound(pokemonSong);
  
        useEffect(() => {
    
        const audio = new Audio("./assets/Pokemon Cancion/Y2meta.app - Pokemon Ruby_Sapphire_Emerald- Littleroot Town (128 kbps).mp3");
        audio.loop = true;
        audio.play();
    
    
        return () => { 
            audio.pause();
        };
        
      }, []);     




  return (
    <div>
    <p>Reproduciendo música de fondo...</p>
    <button onClick={playSound} >Play</button>
  </div>
  );

};
export default BackgroundMusic
