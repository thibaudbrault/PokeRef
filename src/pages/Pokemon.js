import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

export default function Pokemon() {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setPokemon(results.map((res) => res.data));
        });
    }, []);

    console.log(pokemon);

    return (
        <main className='pokedex'>
            {loading ? (
                <BarWave width="40px" height="20px" color="#cc0000" />
            ) : (
                <ol className='pokedex_container'>
                    {pokemon.map((p) => (
                        <li key={p.name} className='pokedex_container_inner'>
                            <div className='pokedex_container_inner_image'>
                                <img className='pokedex_container_inner_image_sprite' src={p.sprites.front_default} alt={p.name} loading="lazy" />
                                <img className='pokedex_container_inner_image_shiny' src={p.sprites.front_shiny} alt={p.name} loading="lazy" />
                            </div>
                            <p>#{p.id.toString().padStart(3, '0')}</p>
                            <h2>{p.name}</h2>
                            <div id={p.types[0].type.name} className='pokedex_container_inner_types'>
                                <img alt={p.types[0].type.name} />
                                <span>{p.types[0].type.name}</span>
                            </div>
                            {(p.types.length === '2') 
                                ? <div>{p.types[1].type.name}</div>
                                : null
                            }
                        </li>
                    ))}
                </ol>
            )}
        </main>
    )
}