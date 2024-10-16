import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FilterRegion() {
    const [region, setRegion] = useState("kanto");
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const pokedexIds = {
        kanto: 2,
        johto: 7,
    };

    const handleRegionClick = (regionName) => {
        setRegion(regionName.toLowerCase());
    };

    const getAllPokemon = async () => {
        setLoading(true);
        setError(false);
        try {
            const pokedexId = pokedexIds[region];
            if (!pokedexId) {
                throw new Error("Invalid region");
            }
            const regionUrl = `https://pokeapi.co/api/v2/pokedex/${pokedexId}`;
            const regionRes = await axios.get(regionUrl);
            const pokemonEntries = regionRes.data.pokemon_entries;
            const pokemonUrls = pokemonEntries.map(entry => `https://pokeapi.co/api/v2/pokemon/${entry.pokemon_species.name}`);
            const pokemonPromises = pokemonUrls.map(url => axios.get(url));
            const allPokemonData = await Promise.all(pokemonPromises);

            setPokemonData(allPokemonData.map(res => res.data));
        } catch (e) {
            console.log(e);
            setError(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAllPokemon();
    }, [region]);

    return (
        
        <div className="App">
            <p>Filter</p>
            <div className="region-buttons">
                {Object.keys(pokedexIds).map(regionName => (
                    <button key={regionName} onClick={() => handleRegionClick(regionName)}>
                        {regionName.charAt(0).toUpperCase() + regionName.slice(1)}
                    </button>
                ))}
            </div>
            
            {loading ? <p>Loading...</p> : error ? <p>Error fetching data</p> : pokemonData.length === 0 ? <p>No Pokémon found</p> :
            
                <div className="card-container">
                    {pokemonData.map((data) => {
                        return (
                            <div className="card" key={data.id}>
                                <div className="image-container">
                                    <img src={data.sprites.front_default} alt={data.name} />
                                </div>
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
            }
        </div>
    );
}