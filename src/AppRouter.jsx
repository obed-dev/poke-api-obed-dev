// src/App.jsx
import React from 'react';
import {  BrowserRouter as Router, Routes, Route , useNavigate} from 'react-router-dom';
import { PokemonInfo } from './components/PokemonInfo';
import { usePokemon } from './components/PokemonProvider';
import { PokemonDetails }from './components/PokemonDetails';

export const AppRouter = () => {
  const { selectedPokemon, openPokemonDetails } = usePokemon();
  const navigate = useNavigate();

  const handleOpenDetails = (pokemonName) => {
    openPokemonDetails(pokemonName);
    navigate(`/pokemon/${pokemonName}`);
  };

  return (
  
    <Routes>
      <Route
        path="/"
        element={<PokemonInfo onPokemonClick={handleOpenDetails} />}
      />
      <Route
        path="/pokemon/:name"
        element={<PokemonDetails />}
      />
    </Routes>
    
  );
}


