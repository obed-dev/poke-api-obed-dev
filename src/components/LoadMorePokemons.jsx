import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(150);
  const [volume , setVolume ] = useState(50);
  const navigate = useNavigate();
  



 


  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150&offset=${offset}`);
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
      setPokemonList(prevList => [...prevList, ...newPokemonList].sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error('Error fetching pokémon data:', error);
    }
  };
  const playPokemonSound = (soundUrl) => {
       
    const audio = new Audio(soundUrl);
    audio.volume = volume / 100;
    audio.play();
};

const handleViewDetails = (pokemonName) => {
localStorage.setItem('scrollPosition', window.scrollY); // Guardar posición
navigate(`/pokemon/${pokemonName}`);
};

   



  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + 150);
    fetchPokemon();
  };

  useEffect(() => {
  
      const savedScrollPosition = localStorage.getItem('scrollPosition');
      if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }
  }, []);

  return (
   
    <div className="pokemon-container container text-center">
    <div className="row">
        {pokemonList.map((pokemon, index) => (
            <div class="col-lg-4 col-md-6 col-sm-12" id='hover__pokemon' key={index}>
                <div className="pokemon-card">
                    <img src={pokemon.image} alt={pokemon.name} className='pokemon-imagen' />
                    
                    <p className='pokemon-titulo'>
                        
                        <span  onClick={() => handleViewDetails(pokemon.name)} // Redirige al hacer clic en la tarjeta
                         style={{ cursor: 'pointer' }}>{pokemon.name}</span>
                         </p>
                         <h3 >  {pokemon.id} -  {pokemon.class}</h3>
                    <button className='button-pokemon' onClick={() => playPokemonSound(pokemon.sound)}>
                        Play Sound
                    </button>
                </div>
            </div>
        ))}
    </div>
    <button className='loadMore' onClick={handleLoadMore}>Load More</button>
</div>
      
    
  );
};

