import './App.css'
import React, { useState } from "react";
import axios from "axios";

export default function SearchPoke() {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter Pokémon name"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        return (
          <div className="card-container" key={data.id}>
            <img src={data.sprites.front_default} alt={data.name} />
            <div className="card-body">
                <h3>{data.name}</h3>
                <p>Type: {data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p>Height: {Math.round(data.height * 3.9)}"</p>
                <p>Weight: {Math.round(data.weight / 4.3)} lbs</p>
                <p>Abilities: {data.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ')}</p>
            </div>  
          </div>
        );
      })}
    </div>
  );
}
