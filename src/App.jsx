import React, { useState, useEffect } from 'react';
import useSound from "use-sound";
import pokemonSong from "./assets/Pokemon Cancion/Y2meta.app - Pokemon Ruby_Sapphire_Emerald- Littleroot Town (128 kbps).mp3";
import image1 from "./assets/images/Playing-music-in-the-bakcgroun-12-4-2024 (1).png";
import './App.css'; 

function PokemonInfo() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonImageUrl, setPokemonImageUrl] = useState('');
    const [pokemonSound, setPokemonSound] = useState('');
    const [error, setError] = useState('');
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
const [playSound, { stop }] = useSound(pokemonSong, { loop: true });

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
                const data = await response.json();
                const pokemonPromises = data.results.map(async (pokemon) => {
                    const pokemonResponse = await fetch(pokemon.url);
                    const pokemonData = await pokemonResponse.json();
                    return {
                        name: pokemon.name,
                        image: pokemonData.sprites.other.showdown.front_default,
                        sound: pokemonData.cries.latest,
                    };
                });
                const pokemonWithImages = await Promise.all(pokemonPromises);
                setPokemonList(pokemonWithImages);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data. Please try again.');
                setLoading(false);
            }
        };

        fetchPokemonList();
    }, []);

    const playPokemonSound = (soundUrl) => {
        
        const audio = new Audio(soundUrl);
        audio.play();
    };


    const togglePlayPause = () => {
        if (isPlaying) {
            stop();
            setIsPlaying(false);
            pokemonSong.loop(false);
        } else {
            playSound();
            setIsPlaying(true);
        }
    };
  

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedSearchTerm = searchTerm.trim().toLowerCase();
            if (trimmedSearchTerm !== '') {
                try {
                    const urlAPI = `https://pokeapi.co/api/v2/pokemon/${trimmedSearchTerm}`;
                    const response = await fetch(urlAPI);
                    const result = await response.json();
                    setPokemonName(result.name);
                    setPokemonImageUrl(result.sprites.other.dream_world.front_default);
                    setPokemonSound(result.cries.latest); 
                    setError('');
                } catch (error) {
                    setError( Swal.fire({
                        title: "Now you got Psyduck confused",
                        text: "Please try again with a correct pokemon name!",
                        imageUrl: "https://lovescienceandnat20s.files.wordpress.com/2017/07/confused-pokemon.gif?w=676",
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Psyduck confused means error"
                      })  );
                }
            }
        }
    };

    return (
        <div>
            <div className='pokedex-image'>
                <img className='image-poke' src="https://raw.githubusercontent.com/sleduardo20/pokedex/0671af442dff1d8f7141e49eb83b438885bbc9e9/public/img/logo.svg" alt="pokedex-image" srcset="" />
            </div>

            <input
                id="search__pokemon"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search Pokemon..."
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {pokemonName && (
                <>
                    <div id='pokemon-card-search'>
                        <div className='pokemon-info'>
                            <img src={pokemonImageUrl} alt={pokemonName} />
                            <p>
                                <span>{pokemonName}</span>
                            </p>
                            <button className='button-pokemon' onClick={() => playPokemonSound(pokemonSound)}>
                                Play Sound
                            </button>
                        </div>
                    </div>
                </>
            )}

            <div className='music-player'>
                <img src={image1} alt="" className='text-pokemon' />
                <button onClick={togglePlayPause}>Play/Pause</button>
                
            </div>

            <h2>Pokemon List</h2>

            <div className="pokemon-container container text-center">
                <div className="row">
                    {pokemonList.map((pokemon, index) => (
                        <div class="col-lg-4 col-md-6 col-sm-12" key={index}>
                            <div className="pokemon-card">
                                <img src={pokemon.image} alt={pokemon.name} className='pokemon-imagen' />
                                <p className='pokemon-titulo'>
                                    <span>{pokemon.name}</span>
                                </p>
                                <button className='button-pokemon' onClick={() => playPokemonSound(pokemon.sound)}>
                                    Play Sound
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonInfo;