import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

function Pokemon() {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=898')
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


    return (
        <>
            <main className='pokedex'>
                {loading ? (
                    <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <div className='pokedex_generation' id='gen2'>
                        <ol className='pokedex_container'>
                            {pokemon.map((p) => (
                                <li key={p.name} className='pokedex_container_inner'>
                                    <div className='pokedex_container_inner_image'>
                                        {p.id < 152 ? (
                                            <img className='pokedex_container_inner_image_sprite' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${p.id}.png`} alt={p.name} loading='lazy' />
                                        ) : (
                                            null
                                        )}
                                        {p.id > 151 && p.id < 252 &&
                                            <>
                                                <img className='pokedex_container_inner_image_sprite' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${p.id}.png`} alt={p.name} loading='lazy' />
                                                <img className='pokedex_container_inner_image_shiny' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/shiny/${p.id}.png`} alt={p.name} loading='lazy' />
                                            </>}
                                        {p.id > 251 && p.id < 387 &&
                                            <>
                                                <img className='pokedex_container_inner_image_sprite' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${p.id}.png`} alt={p.name} loading='lazy' />
                                                <img className='pokedex_container_inner_image_shiny' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-iii/emerald/shiny/${p.id}.png`} alt={p.name} loading='lazy' />
                                            </>}
                                        {p.id > 386 && p.id < 494 &&
                                            <>
                                                <img className='pokedex_container_inner_image_sprite' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-iv/platinum/${p.id}.png`} alt={p.name} loading='lazy' />
                                                <img className='pokedex_container_inner_image_shiny' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-iv/platinum/shiny/${p.id}.png`} alt={p.name} loading='lazy' />
                                            </>}
                                        {p.id > 493 && p.id < 650 && 
                                            <>
                                                <img className='pokedex_container_inner_image_sprite' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-v/black-white/${p.id}.png`} alt={p.name} loading='lazy' />
                                                <img className='pokedex_container_inner_image_shiny' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/${p.id}.png`} alt={p.name} loading='lazy' />
                                            </>}
                                        {p.id > 649 && 
                                        <>
                                            <img className='pokedex_container_inner_image_sprite' src={p.sprites.front_default} alt={p.name} loading='lazy' />
                                            <img className='pokedex_container_inner_image_shiny' src={p.sprites.front_shiny} alt={p.name} loading='lazy' />
                                        </>}
                                    </div>
                                    <p>#{p.id.toString().padStart(3, '0')}</p>
                                    <h2>{p.name.replace(/-/g, ' ')}</h2>
                                    <div className='pokedex_container_inner_types'>
                                        {p.types.map((pt) => (
                                            <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                <img alt={pt.type.name} />
                                                <span>{pt.type.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </main>
        </>
    )
}

export default Pokemon;