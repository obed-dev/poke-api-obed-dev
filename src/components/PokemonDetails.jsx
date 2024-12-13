import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../PokemonDetail.css";

export const PokemonDetails = () => {
  const { name } = useParams(); // Extraemos el nombre desde la URL
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar datos
  const fetchPokemonData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error('Error fetching the Pokémon data');
      }
      const data = await response.json();
      setPokemonData(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching the Pokémon data');
      setLoading(false);
    }
  };

  // Carga de datos cuando cambia el nombre
  useEffect(() => {
    fetchPokemonData();
  }, [name]);

  // Mostrar mensajes de carga o error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!pokemonData) return null;

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
  )};