import React, { useState, useEffect } from 'react';
import { AudioControls } from './AudioControls';
import image1 from "../assets/images/Playing-music-in-the-bakcgroun-12-4-2024 (1).png";
import { BuscarPokemon } from "./SearchingPokemon";
import { ScrollToTopButton } from "./ScrollUp";
import { Pokedex } from "./LoadMorePokemons";
import { usePokemon } from "./PokemonProvider";
import { useNavigate, useLocation  } from 'react-router-dom';
import '../App.css'; 
import { Navbar } from './Navbar';




export const PokemonInfo = () => {
   
    const [error, setError] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const { openPokemonDetails } = usePokemon(); 
    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();


    const fetchPokemon = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
            const data = await response.json();
            const pokemonPromises = data.results.map(async (pokemon) => {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                return {
                    id : pokemonData.id,
                    name: pokemon.name,
                    class: pokemonData.types[0].type.name,
                    image: pokemonData.sprites.other.showdown.front_default,
                    sound: pokemonData.cries.latest,
                };
            });
            const pokemonWithImages = await Promise.all(pokemonPromises);
            setPokemonList(pokemonWithImages);
            setFilteredPokemons(pokemonWithImages);
            setLoading(false);
        } catch (error) {
            setError('Error fetching data. Please refresh the app.');
            setLoading(false);
        }
    };
   

    const playPokemonSound = (soundUrl) => {
       
        const audio = new Audio(soundUrl);
        audio.volume = 0.2;
        audio.play();
    };


    //filtered pokemons
    const filterByType = async (type) => {
        setLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            const data = await response.json();
            const filtered = pokemonList.filter((pokemon) =>
                data.pokemon.some((p) => p.pokemon.name === pokemon.name)
            );
            setFilteredPokemons(filtered);
            setLoading(false);
        } catch (error) {
            setError('Error filtering data. Please try again.');
            setLoading(false);
        }
    };
   

    const handlePokemonClick = (pokemonName) => {
        setScrollPosition(window.scrollY); // Guardar la posición actual
        navigate(`/pokemon/${pokemonName}`, { state: { from: location.pathname, scrollY: window.scrollY } });
      };
    
      useEffect(() => {
        fetchPokemon();
        if (location.state && location.state.scrollY) {
          window.scrollTo(0, location.state.scrollY); // Restaurar el scroll al regresar
        }
      }, [location.state]);

    

    return (
        <div>
            
                  < BuscarPokemon/>

                <div className='music-player' >
              <img src={image1} alt="background text" className='text-pokemon' />
                  <AudioControls />
                </div>
               <Navbar  onFilter={filterByType} />
            <h2>Pokemon List</h2>


{ loading ? (  
    <p> Loading ... </p>
  ) :  error ? ( 
    <p> Error ... </p>
  ) :   (   

      
      <div className="pokemon-container container text-center">
                <div className="row">
                    {filteredPokemons.map((pokemon, index) => (
                        <div class="col-lg-4 col-md-6 col-sm-12" id='hover__pokemon' key={index}>
                            <div className="pokemon-card" >
                                <img src={pokemon.image} alt={pokemon.name} 
                              
                              className='pokemon-imagen' />
                                
                                <p className='pokemon-titulo'>
                                    
                                    <span  onClick={() => handlePokemonClick(pokemon.name)}>{pokemon.name}</span>
                                     </p>
                                     <h3 >  {pokemon.id} -  {pokemon.class}</h3>
                                <button className='button-pokemon' onClick={() => playPokemonSound(pokemon.sound) }>
                                    Play Sound
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
                )  }

         
             < Pokedex />
         
             
            <ScrollToTopButton />
        </div>
    );
}

