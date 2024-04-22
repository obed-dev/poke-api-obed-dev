import React, { useState } from 'react';

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(9);



  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${offset}`);
      const data = await response.json();
      
      const pokemonPromises = data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          class: pokemonData.types[0].type.name,
          image: pokemonData.sprites.other.showdown.front_default,
          sound: pokemonData.cries.latest,
        };
      });
      
      const newPokemonList = await Promise.all(pokemonPromises);
      setPokemonList(prevList => [...prevList, ...newPokemonList]);
    } catch (error) {
      console.error('Error fetching pokémon data:', error);
    }
  };
  const playPokemonSound = (soundUrl) => {
       
    const audio = new Audio(soundUrl);
    audio.volume = 0.2;
    audio.play();
};
 


  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + 9);
    fetchPokemon();
  };

  return (
   
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
    <button onClick={handleLoadMore}>Load More</button>
</div>
      
    
  );
};

export default Pokedex;