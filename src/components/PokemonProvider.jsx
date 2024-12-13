import React, { createContext, useState, useContext } from 'react';

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const openPokemonDetails = (pokemonName) => {
    setSelectedPokemon(pokemonName);
    setShowDetails(true);
  };

  const closePokemonDetails = () => {
    setSelectedPokemon(null);
    setShowDetails(false);
  };

  return (
    <PokemonContext.Provider
      value={{
        selectedPokemon,
        showDetails,
        openPokemonDetails,
        closePokemonDetails,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);