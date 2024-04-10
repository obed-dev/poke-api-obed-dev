import React, { useState, useEffect } from 'react';
import {} from './App.css'



const searchPokemon = () => {


const [searchTerm, setSearchTerm] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonImageUrl, setPokemonImageUrl] = useState('');
    const [pokemonSound, setPokemonSound] = useState('');
      const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');



const playPokemonSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.play();
};



    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedSearchTerm = searchTerm.trim().toLowerCase();
            if (trimmedSearchTerm !== '') {
                try {
                    const urlAPI = `https://pokeapi.co/api/v2/pokemon/${trimmedSearchTerm}`;
                    const response = await fetch(urlAPI);
                    const result = await response.json();
                    setPokemonName(result.name);
                    setPokemonImageUrl(result.sprites.other.dream_world.front_default);
                    setPokemonSound(result.cries.latest); 
                    setError('');
                } catch (error) {
                    setError('Error fetching data. Please try again.');
                }
            }
        }
    };

  return (
    <div  >
    <input
        id="search__pokemon"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search Pokemon..."
    />
    <div id="pokemon-info">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {pokemonName && (
            <>
                <h1>{pokemonName}</h1>
                <img src={pokemonImageUrl} alt={pokemonName} />
                <button  className='button-pokemon'   onClick={() => playPokemonSound(pokemonSound)}>
                    Reproducir Sonido
                </button>
            </>
        )}
        </div>
        
        
    
</div>
);
}

export default searchPokemon