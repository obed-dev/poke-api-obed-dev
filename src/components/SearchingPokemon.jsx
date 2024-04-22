import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';




function BuscarPokemon() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonType, setPokemonType] = useState('');
    const [pokemonImageUrl, setPokemonImageUrl] = useState('');
    const [pokemonSound, setPokemonSound] = useState('');
    const [error, setError] = useState();
    const [showModal, setShowModal] = useState(false);
    const [pokemonId , setPokemonId  ] = useState('');
    

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedSearchTerm = searchTerm.trim().toLowerCase();
            if (trimmedSearchTerm !== '') {
                try {
                    const urlAPI = `https://pokeapi.co/api/v2/pokemon/${trimmedSearchTerm}`;
                    const response = await fetch(urlAPI);
                    const result = await response.json();
                    setPokemonId(result.id);
                    setPokemonName(result.name);
                    setPokemonType(result.types[0].type.name)
                    setPokemonImageUrl(result.sprites.other.dream_world.front_default);
                    setPokemonSound(result.cries.latest);
                    setShowModal(true);
                    setError('');
                } catch (error) {
                    setError(Swal.fire({
                        title: "Now you got Psyduck confused",
                        text: "Please try again with a correct pokemon name!",
                        imageUrl: "https://lovescienceandnat20s.files.wordpress.com/2017/07/confused-pokemon.gif?w=676",
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Psyduck confused means error"
                      }));
                      
                }
            }
        }
    };

    const playPokemonSound = (soundUrl) => {
        const audio = new Audio(soundUrl);
        audio.volume = 0.2;
        audio.play();
    };

 


    return (
        <div>
            <div className='pokedex-image'>
                <img className='image-poke' src="https://raw.githubusercontent.com/sleduardo20/pokedex/0671af442dff1d8f7141e49eb83b438885bbc9e9/public/img/logo.svg" alt="pokedex-image" />
            </div>

            <input
                id="search__pokemon"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search Pokemon..."
            />

            {   (error != searchTerm ) && < fetchPokemonList/>}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='pokemon-titulo' >{pokemonName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id='pokemon-card-search'>
                    <img src={pokemonImageUrl} alt={pokemonName}  />
                    <h2>{pokemonId}</h2>
                    <h3>Type: {pokemonType}</h3>
                   
                    <button className='button-pokemon' onClick={() => playPokemonSound(pokemonSound)}>Play Sound</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BuscarPokemon;