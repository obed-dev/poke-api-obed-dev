
import React from 'react';

const types = ['grass', 'poison', 'water', 'normal', 'fire', 'electric', 'bug', 'psychic', 'flying', 'ground'];

export const Navbar = ({ onFilter }) => {
  return (
    <nav className="navbar">
      {types.map((type) => (
        <button 
          key={type} 
          className="btn-type" 
          onClick={() => onFilter(type)}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};


