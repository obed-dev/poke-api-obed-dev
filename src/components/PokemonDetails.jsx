import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import "../PokemonDetail.css";

export const PokemonDetails = () => {
  const { name } = useParams();

  // Función que TanStack Query usará
  const fetchPokemonData = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Error fetching Pokémon data");
    return response.json();
  };

  // Usamos TanStack Query sin estados extra
  const {
    data: pokemonData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: fetchPokemonData,
    staleTime: 1000 * 60 * 10, // Mantener en cache por 10 minutos
    cacheTime: 1000 * 60 * 60, // Mantenerlo guardado por 1 hora en memoria
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="pokemon-details">

      <div className="pokemon-image-container">
        <h2 className="pokemon-name">{pokemonData.name.toUpperCase()}</h2>

        <img
          src={pokemonData.sprites.other['official-artwork'].front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </div>

      <div className="pokemon-info">

        <div className="info-section">
          <div className="info-header">Height and Weight</div>
          <div className="info-item">Height: {pokemonData.height / 10} m</div>
          <div className="info-item">Weight: {pokemonData.weight / 10} kg</div>
        </div>

        <div className="info-section">
          <div className="info-header">Types</div>
          <div className="types-container">
            {pokemonData.types.map((type) => (
              <div key={type.type.name} className="type-item">
                {type.type.name}
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <div className="info-header">Stats</div>
          <div className="stats-container">
            {pokemonData.stats.map((stat) => (
              <div key={stat.stat.name} className="stat-bar">
                <span className="stat-name">{stat.stat.name}</span>
                <div className="stat-value">
                  <div
                    className="stat-fill"
                    style={{ width: `${stat.base_stat}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
