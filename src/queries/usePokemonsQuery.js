// src/queries/usePokemonsQuery.js
import { useQuery } from '@tanstack/react-query';

export const usePokemonsQuery = () => {
  return useQuery({
    queryKey: ['pokemons'],
          staleTime: Infinity,
          cacheTime: Infinity,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,

    queryFn: async () => {
       console.log("❗ REAL REQUEST to API");
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await response.json();

      const pokemonPromises = data.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();

        return {
          id: pokemonData.id,
          name: pokemon.name,
          class: pokemonData.types[0].type.name,
          image: pokemonData.sprites.other.showdown.front_default,
          sound: pokemonData.cries.latest,
          
        };
      });

      return await Promise.all(pokemonPromises);
    },
  });
};
