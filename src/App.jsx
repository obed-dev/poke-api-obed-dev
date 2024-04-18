import React, { useState, useEffect } from 'react';
import useSound from "use-sound";
import pokemonSong from "./assets/Pokemon Cancion/Y2meta.app - Pokemon Ruby_Sapphire_Emerald- Littleroot Town (128 kbps).mp3";
import image1 from "./assets/images/Playing-music-in-the-bakcgroun-12-4-2024 (1).png";
import BuscarPokemon from "./components/SearchingPokemon";
import ScrollUp from "./components/ScrollUp";

import './App.css'; 

function PokemonInfo() {
   
    const [error, setError] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playSound, { stop }] = useSound(pokemonSong, { loop: true });

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
                const data = await response.json();
                const pokemonPromises = data.results.map(async (pokemon) => {
                    const pokemonResponse = await fetch(pokemon.url);
                    const pokemonData = await pokemonResponse.json();
                    return {
                        id : pokemonData.id,
                        name: pokemon.name,
                        class: pokemonData.types[0].type.name,
                        image: pokemonData.sprites.other.showdown.front_default,
                        sound: pokemonData.cries.latest,
                    };
                });
                const pokemonWithImages = await Promise.all(pokemonPromises);
                setPokemonList(pokemonWithImages);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data. Please refresh the app.');
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, []);

    const playPokemonSound = (soundUrl) => {
       
        const audio = new Audio(soundUrl);
        audio.volume = 0.2;
        audio.play();
    };


    const togglePlayPause = () => {
        if (isPlaying) {
            stop();
            setIsPlaying(false);
            pokemonSong.loop(false);
        } else {
            playSound();
            setIsPlaying(true);
        }
    };
  

    

    return (
        <div>
            
                  < BuscarPokemon/>
                

            <div className='music-player'>
                <img src={image1} alt="" className='text-pokemon' />
                <button onClick={togglePlayPause}>Play/Pause</button>
                
            </div>
            
            <h2>Pokemon List</h2>

            <div className="pokemon-container container text-center">
                <div className="row">
                    {pokemonList.map((pokemon, index) => (
                        <div class="col-lg-4 col-md-6 col-sm-12" id='hover__pokemon' key={index}>
                            <div className="pokemon-card">
                                <img src={pokemon.image} alt={pokemon.name} className='pokemon-imagen' />
                                
                                <p className='pokemon-titulo'>
                                    
                                    <span>{pokemon.name}</span>
                                     </p>
                                     <h3 >  {pokemon.id} -  {pokemon.class}</h3>
                                <button className='button-pokemon' onClick={() => playPokemonSound(pokemon.sound)}>
                                    Play Sound
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ScrollUp />
        </div>
    );
}

export default PokemonInfo;