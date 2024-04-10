import React, { useState, useEffect } from 'react';

import './App.css'; // Asegúrate de importar tus estilos CSS aquí

function PokemonInfo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonImageUrl, setPokemonImageUrl] = useState('');
    const [pokemonSound, setPokemonSound] = useState('');
    const [error, setError] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
                const data = await response.json();
                const pokemonPromises = data.results.map(async (pokemon) => {
                    const pokemonResponse = await fetch(pokemon.url);
                    const pokemonData = await pokemonResponse.json();
                    return {
                        name: pokemon.name,
                        image: pokemonData.sprites.front_default,
                        sound: pokemonData.cries.latest
                    };
                });
                const pokemonWithImages = await Promise.all(pokemonPromises);
                setPokemonList(pokemonWithImages);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data. Please try again.');
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, []);

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
                    setPokemonImageUrl(result.sprites.front_default);
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
                <h2>Pokemon List</h2>
                <div className='card' >
                <ul>
                    {pokemonList.map((pokemon, index) => (
                        <li key={index}>
                            <img src={pokemon.image} alt={pokemon.name} className='pokemon'/>
                          <h2> {pokemon.name}</h2> 
                            <button className='button-pokemon'   onClick={() => playPokemonSound(pokemon.sound)}>
                                Reproducir Sonido
                            </button>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    );
}

export default PokemonInfo;