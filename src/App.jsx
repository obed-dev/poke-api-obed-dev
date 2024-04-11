import React, { useState, useEffect } from 'react';

import './App.css'; 

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
                        image: pokemonData.sprites.other.showdown.front_default,
                        sound: pokemonData.cries.latest,
                        
                        

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
              
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {pokemonName && (
                    <>
                   <div className='pokemon-card'>
                <div className='pokemon-info'>
                <img src={pokemonImageUrl} alt={pokemonName} />
                   <p>
                  <span>{pokemonName}</span>
                   </p>
                  <button className='button-pokemon' onClick={() => playPokemonSound(pokemonSound)}>
                  Play Sound
                 </button>
              </div>
               </div>
                    </>
                )}
                
                <h2>Pokemon List</h2>
                

                <div className="pokemon-container container text-center">
               <div className="row">
               {pokemonList.map((pokemon, index) => (
                <div class="col-lg-4 col-md-6 col-sm-12" key={index}>
                <div className="pokemon-card">
                    <img src={pokemon.image} alt={pokemon.name} className='pokemon-imagen' />
                    <p className='pokemon-titulo'>
                        <span>{pokemon.name}</span>
                    </p>
                    <button className='button-pokemon' onClick={() => playPokemonSound(pokemon.sound)}>
                        Play Sound
                    </button>
                </div>
            </div>
             ))}
           </div>
         </div>
            
        </div>




    );
}

export default PokemonInfo;