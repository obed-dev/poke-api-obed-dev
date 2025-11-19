import React, { useState, useEffect } from 'react';
import { AudioControls } from './AudioControls';
import image1 from "../assets/images/Playing-music-in-the-bakcgroun-12-4-2024 (1).png";
import { BuscarPokemon } from "./SearchingPokemon";
import { ScrollToTopButton } from "./ScrollUp";
import { Pokedex } from "./LoadMorePokemons";
import { usePokemon } from "./PokemonProvider";
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import '../App.css'; 

import { usePokemonsQuery } from '../queries/usePokemonsQuery';
import { useFilterByTypeQuery } from '../queries/useFilterByTypeQuery';

export const PokemonInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openPokemonDetails } = usePokemon();
  const [selectedType, setSelectedType] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // 1) Carga principal
  const { data: pokemonList = [], isLoading, error } = usePokemonsQuery();

  // 2) Filtrado (solo cuando hay tipo)
  const { data: filteredPokemons = pokemonList } = useFilterByTypeQuery(
    selectedType,
    pokemonList
  );

  const playPokemonSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    audio.volume = 0.2;
    audio.play();
  };

  const filterByType = (type) => {
    setSelectedType(type);
  };

  const handlePokemonClick = (pokemonName) => {
    setScrollPosition(window.scrollY);
    navigate(`/pokemon/${pokemonName}`, {
      state: { from: location.pathname, scrollY: window.scrollY },
    });
  };

  useEffect(() => {
    if (location.state?.scrollY) {
      window.scrollTo(0, location.state.scrollY);
    }
  }, [location.state]);

  return (
    <div>
      <BuscarPokemon />
      
      <div className='music-player'>
         <img src={image1} alt="background text" className='text-pokemon' />
      </div>

      <AudioControls />

      <Navbar onFilter={filterByType} />

      <h2>Pokemon List</h2>

      {isLoading && <p>Loading ...</p>}
      {error && <p>Error fetching data.</p>}

      {!isLoading && !error && (
        <div className="pokemon-container container text-center">
          <div className="row">
            {filteredPokemons.map((pokemon, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12" id='hover__pokemon' key={index}>
                <div className="pokemon-card">
                  <img src={pokemon.image} alt={pokemon.name} className='pokemon-imagen' />
                  <p className='pokemon-titulo'>
                    <span onClick={() => handlePokemonClick(pokemon.name)}>
                      {pokemon.name}
                    </span>
                  </p>
                  <h3>{pokemon.id} - {pokemon.class}</h3>
                  <button className='button-pokemon' onClick={() => playPokemonSound(pokemon.sound)}>
                    Play Sound
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Pokedex />
      <ScrollToTopButton />
    </div>
  );
};
