import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Pokemon() {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=807")
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
            <ol className='pokedex_container'>
                {loading ? (
                    <h2>Loading...</h2>
                ) : (
                    pokemon.map((p) => (
                    <li key={p.name} className='pokedex_container_inner'>
                        <img src={p.sprites.front_default} alt={p.name} loading="lazy" />
                        <p>{p.id}</p>
                        <h2>{p.name}</h2>
                    </li>
                    ))
                )}
            </ol>
        </main>
    )
}