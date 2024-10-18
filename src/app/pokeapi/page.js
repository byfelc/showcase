// app/pokeapi/page.js
"use client";

import { useState, useEffect } from "react";
import styles from './PokeAPI.module.css';

export default function PokeAPIComponent() {
  const [pokemon, setPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("pikachu");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPokemon();
  };

  return (
    <div className={styles.container}>
      <h1>PokeAPI</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a Pokémon..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {pokemon && (
        <div className={styles.pokedex}>
          <h2>Nombre: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2> {}
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.image} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}
