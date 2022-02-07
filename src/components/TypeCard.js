import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const TypeCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [type, setType] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/type/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setType(results);
        });
    }, [name]);

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=899')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setPokemon(results.map((res) => res.data));
        });
    }, []);

    const [moves, setMoves] = useState([]);

    useEffect(() => {
        axios
        .get('https://pokeapi.co/api/v2/move?limit=826')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setMoves(results.map((res) => res.data));
        });
    }, []);

    const nbPokemon = type?.pokemon?.length;
    const nbMoves = type?.moves?.length;

    return (
        <>
            <Header />
            <Nav />
            <main className='type'>
                {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <>
                        <h2 className='type_title'>{type.name}</h2>
                        <section className='type_damage'>
                            <h3 className='type_damage_title'>Attack</h3>
                            <table className='type_damage_table'>
                                <tr className='type_damage_table_row'>
                                    <th className="type_damage_table_row_head">No damage to</th>
                                    {type?.damage_relations?.no_damage_to?.map((ndt) => (
                                        <td className='type_damage_table_row_element' id={ndt.name}>
                                            <img alt={ndt.name} />
                                        </td>
                                    ))}
                                </tr>
                                <tr className='type_damage_table_row'>
                                    <th className="type_damage_table_row_head">Half damage to</th>
                                    {type?.damage_relations?.half_damage_to?.map((hdt) => (
                                        <td className='type_damage_table_row_element' id={hdt.name}>
                                            <img alt={hdt.name} />
                                        </td>
                                    ))}
                                </tr>
                                <tr className='type_damage_table_row'>
                                    <th className="type_damage_table_row_head">Double damage to</th>
                                    {type?.damage_relations?.double_damage_to?.map((ddt) => (
                                        <td className='type_damage_table_row_element' id={ddt.name}>
                                            <img alt={ddt.name} />
                                        </td>
                                    ))}
                                </tr>
                            </table>
                        </section>
                        <section className='type_damage'>
                            <h3 className='type_damage_title'>Defense</h3>
                            <table className='type_damage_table'>
                                <tr className='type_damage_table_row'>
                                    <th className="type_damage_table_row_head">No damage from</th>
                                    {type?.damage_relations?.no_damage_from?.map((ndf) => (
                                        <td className='type_damage_table_row_element' id={ndf.name}>
                                            <img alt={ndf.name} />
                                        </td>
                                    ))}
                                </tr>
                                <tr className='type_damage_table_row'>
                                    <th className="type_damage_table_row_head">Half damage from</th>
                                    {type?.damage_relations?.half_damage_from?.map((hdf) => (
                                        <td className='type_damage_table_row_element' id={hdf.name}>
                                            <img alt={hdf.name} />
                                        </td>
                                    ))}
                                </tr>
                                <tr className='type_damage_table_row'>
                                    <th className="type_damage_table_row_head">Double damage from</th>
                                    {type?.damage_relations?.double_damage_from?.map((ddf) => (
                                        <td className='type_damage_table_row_element' id={ddf.name}>
                                            <img alt={ddf.name} />
                                        </td>
                                    ))}
                                </tr>
                            </table>
                        </section>
                        <section className='type_container'>
                            <h3 className='type_container_subtitle'>{nbPokemon} Pokémon are <span>{type.name}</span> type</h3>
                            <div className='type_container_pokemon'>
                                {type?.pokemon?.map((tp) => (
                                    pokemon?.map((p) =>
                                        p.name === tp.pokemon.name && p.id <899 ? (
                                            <div className='type_container_pokemon_inner'>
                                                <img className='type_container_pokemon_inner_img' src={p.sprites.front_default} alt={pokemon.name} loading='lazy' />
                                                <p className='type_container_pokemon_inner_id'>#{p.id}</p>
                                                <Link
                                                to={`/pokemon/${p.name}`}
                                                key={p.name}
                                                className='type_container_pokemon_inner_name'>
                                                    {tp.pokemon.name.replace(/-/g, ' ')}
                                                </Link>
                                            </div>
                                        ) :(
                                            null
                                        )
                                    )
                                ))}
                            </div>
                        </section>
                        <section className='type_container'>
                            <h3 className='type_container_subtitle'>{nbMoves} moves are <span>{type.name}</span> type</h3>
                            <div className='type_container_moves'>
                                <table className='type_container_table'>
                                    <thead className='type_container_table_head'>
                                        <tr className='type_container_table_head_row'>
                                            <th className='type_container_table_row_element'>Name</th>
                                            <th className='type_container_table_row_element'>Category</th>
                                            <th className='type_container_table_row_element'>Power</th>
                                            <th className='type_container_table_row_element'>PP</th>
                                            <th className='type_container_table_row_element'>Accuracy</th>
                                            <th className='type_container_table_row_element'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className='type_container_table_body'>
                                        {type?.moves?.sort((a, b) => a.name.localeCompare(b.name)).map((tm) => (
                                            moves?.map((m) =>
                                                m.name === tm.name ? (
                                                    <tr className='type_container_table_body_row'>
                                                        <td className='type_container_table_body_row_name'>
                                                            <Link
                                                            to={`/moves/${m.name}`}
                                                            key={m.name}
                                                            >
                                                            {tm.name.replace(/-/g, ' ')}
                                                            </Link>
                                                        </td>
                                                        <td className='type_container_table_body_row_element'>{m.damage_class.name}</td>
                                                        <td className='type_container_table_body_row_element'>{m.power}</td>
                                                        <td className='type_container_table_body_row_element'>{m.pp}</td>
                                                        <td className='type_container_table_body_row_element'>{m.accuracy}</td>
                                                        <td className='type_container_table_body_row_element'>{m.meta.ailment.name.replace('none', '-')}</td>
                                                    </tr>
                                                ) : (
                                                    null
                                                )
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className='type_container_comment'><span>{type.name}</span> attacks were <span>{type?.move_damage_class?.name}</span> before the Gen IV</p>
                        </section>
                        <button className='type_button' onClick={() => navigate('/types')}> ᐸ Back to types</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default TypeCard;