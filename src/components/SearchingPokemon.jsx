import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const BuscarPokemon = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedSearchTerm = searchTerm.trim().toLowerCase();
            if (trimmedSearchTerm !== '') {
                try {
                    const urlAPI = `https://pokeapi.co/api/v2/pokemon/${trimmedSearchTerm}`;
                    const response = await fetch(urlAPI);
                    if (!response.ok) {
                        throw new Error('Pokemon not found');
                    }
                    const result = await response.json();
                    setError(null); // Limpia errores previos
                    navigate(`/pokemon/${result.name}`);
                } catch (error) {
                    Swal.fire({
                        title: "Now you got Psyduck confused",
                        text: "Please try again with a correct pokemon name!",
                        imageUrl: "https://lovescienceandnat20s.files.wordpress.com/2017/07/confused-pokemon.gif?w=676",
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Psyduck confused means error",
                    }).then(() => {
                        setError('Pokemon not found');
                        navigate('/'); // Redirige al componente principal
                    });
                }
            }
        }
    };

    return (
        <div>
            <div className='pokedex-image'>
                <img
                    className='image-poke'
                    src="https://raw.githubusercontent.com/sleduardo20/pokedex/0671af442dff1d8f7141e49eb83b438885bbc9e9/public/img/logo.svg"
                    alt="pokedex-image"
                />
            </div>

            <input
                id="search__pokemon"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search Pokemon..."
            />

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};
