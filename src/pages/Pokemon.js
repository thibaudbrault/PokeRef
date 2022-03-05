import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

function Pokemon() {

    const [search, setSearch] = useState('');

    const [type, setType] = useState(['all']);
    const [generation, setGeneration] = useState(['gen1']);

    const [pokedex, setPokedex] = useState([]);
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
            setPokedex(results.map((res) => res.data));
        });
    }, []);

    useEffect(() => {
        document.title = `Pokémon | PokéInfo`;
    }, []);

    console.log(pokedex)

    return (
        <main className='pokedex'>
            {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />

            ) : (
                <>
                    <div className='pokedex_search'>
                        <input className='pokedex_search_input' type="text" placeholder='Pokémon Name' name='searchBar' id='searchBar' onChange={event => {setSearch(event.target.value)}} />
                        <div className='pokedex_search_dropdown'>
                            <label htmlFor="generation">Generation</label>
                            <select name="generation" id="generation" onChange={(e) => {
                                const selectedGen = e.target.value;
                                setGeneration(selectedGen);
                            }}>
                                <option value="all">All</option>
                                <option value="gen1">Generation I</option>
                                <option value="gen2">Generation II</option>
                                <option value="gen3">Generation III</option>
                                <option value="gen4">Generation IV</option>
                                <option value="gen5">Generation V</option>
                                <option value="gen6">Generation VI</option>
                                <option value="gen7">Generation VII</option>
                                <option value="gen8">Generation VIII</option>
                            </select>
                        </div>
                        <div className='pokedex_search_dropdown'>
                            <label htmlFor="type">Type</label>
                            <select name="type" id="type" onChange={(e) => {
                                const selectedType = e.target.value;
                                setType(selectedType);
                            }}>
                                <option value="all">All</option>
                                <option value="bug">Bug</option>
                                <option value="dark">Dark</option>
                                <option value="dragon">Dragon</option>
                                <option value="electric">Electric</option>
                                <option value="fairy">Fairy</option>
                                <option value="fighting">Fighting</option>
                                <option value="fire">Fire</option>
                                <option value="flying">Flying</option>
                                <option value="ghost">Ghost</option>
                                <option value="grass">Grass</option>
                                <option value="ground">Ground</option>
                                <option value="ice">Ice</option>
                                <option value="normal">Normal</option>
                                <option value="poison">Poison</option>
                                <option value="psychic">Psychic</option>
                                <option value="rock">Rock</option>
                                <option value="steel">Steel</option>
                                <option value="water">Water</option>
                            </select>
                        </div>
                    </div>
                    <ol className='pokedex_container'>
                        {pokedex?.filter((pokedex) => {
                            if (search === "") {
                                return pokedex
                            } else if (pokedex.name.replace(/-/g, ' ').toLowerCase().includes(search.toLowerCase())) {
                                return pokedex
                            }
                        })?.filter((pokedex) => {
                            if (type === 'all') {
                                return pokedex
                            } else if (pokedex?.types?.type?.name?.includes(type)) {
                                return pokedex
                            }
                        })?.map((p) => (
                                <li key={p.name} className='pokedex_container_inner'>
                                    <div className='pokedex_container_inner_image'>
                                        {p.id < 152 &&
                                            <img className='pokedex_container_inner_image_sprite' src={`https://raw.githubusercontent.com/pyO3rust/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${p.id}.png`} alt={p.name} loading='lazy' />}
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
                                    <p>#{p?.id?.toString()?.padStart(3, '0')}</p>
                                    <Link
                                        to={`/pokemon/${p.name}`}
                                        key={p.name}
                                    >
                                        <h2>
                                            {p?.name?.replace(/-/g, ' ')}
                                        </h2>
                                    </Link>
                                    <div className='pokedex_container_inner_types'>
                                        {p?.types?.map((pt) => (
                                            <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                <img alt={pt.type.name} />
                                                <span>{pt?.type?.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                    <div className='pokedex_gifs'>
                        <img src="https://media4.giphy.com/media/jRrbtBwb8yNXUhNS5x/giphy.gif?cid=ecf05e473lf0lhh5u1h0oze6llypinsing9if2o4gh1fhw1n&rid=giphy.gif&ct=s" alt='reshiram' width="100" height="100" className="pokedex_gifs_reshiram"></img>
                        <img src="https://media2.giphy.com/media/5E9uS9vKcwu0n7svJA/giphy.gif?cid=ecf05e478q1611hme094r2kdftv7efoxtyq3s1wtwdvm8vgf&rid=giphy.gif&ct=s" alt='zekrom' width="100" height="100" className="pokemon_gifs_zekrom"></img>
                    </div>
                </>
            )}
        </main>
    )
}

export default Pokemon;