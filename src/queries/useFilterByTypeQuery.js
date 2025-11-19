// src/queries/useFilterByTypeQuery.js
import { useQuery } from '@tanstack/react-query';

export const useFilterByTypeQuery = (type, pokemonList) => {
  return useQuery({
    queryKey: ['filterByType', type],
    staleTime: Infinity,
    enabled: !!type && pokemonList.length > 0,
    queryFn: async () => {
       
        
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();

      return pokemonList.filter((pokemon) =>
        data.pokemon.some((p) => p.pokemon.name === pokemon.name)
      );
    },
  });
};
