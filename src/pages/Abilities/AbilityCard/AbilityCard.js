import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../../components/Header/Header';
import Nav from '../../../components/Nav/Nav';
import Footer from '../../../components/Footer/Footer';

const AbilityCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [ability, setAbility] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/ability/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setAbility(results);
        });
    }, [name]);

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=1300')
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

    console.log(ability)

    const title = `${name}`;

    useEffect(() => {
        document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | Abilities | PokéInfo`;
     }, [title]);

    return (
        <>
            <Header />
            <Nav />
            <main className='ability'>
            {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <>
                        <h2 className='ability_title'>{ability?.name?.replace(/-/g, ' ')}</h2>
                        <p className='ability_gen'>{ability?.generation?.name?.replace(/-/g, ' ')}</p>

                        <section className='ability_container'>
                            <div className='ability_container_effect'>
                                <h3 className='ability_container_effect_title'>Effect</h3>
                                {ability?.effect_entries?.map((ae) => 
                                    ae?.language?.name === 'en' &&
                                        <p className='ability_container_effect_text'>
                                            {ae?.effect}
                                        </p>
                                )}
                            </div>
                            <h4 className='ability_container_subtitle'>Overworld</h4>
                        </section>

                        <section className='ability_container'>
                            <h3 className='ability_container_title'>Game descriptions</h3>
                            <table className='ability_container_desc_table'>
                                    <tbody>
                                        {ability?.flavor_text_entries?.map((af) => 
                                            af?.language?.name === 'en' ? (
                                                <tr className='ability_container_desc_table_row'>
                                                    <th className='ability_container_desc_table_row_head'>{af?.version_group?.name?.replace(/-/g, ' ')}</th>
                                                    <td className='ability_container_desc_table_row_element'>{af?.flavor_text}</td>
                                                </tr>
                                            ) : (
                                                ''
                                            )
                                        )}
                                    </tbody>
                            </table>
                        </section>

                        <section className='ability_container'>
                            <h3 className='ability_container_title'>Pokemon with <span>{ability?.name?.replace(/-/g, ' ')}</span></h3>
                            <table className='ability_container_table'>
                                <thead className='ability_container_table_head'>
                                    <tr className='ability_container_table_head_row'>
                                        <th className='ability_container_table_head_row_element'>#</th>
                                        <th className='ability_container_table_head_row_element'>Name</th>
                                        <th className='ability_container_table_head_row_element'>1<sup>st</sup> ability</th>
                                        <th className='ability_container_table_head_row_element'>2<sup>nd</sup> ability</th>
                                        <th className='ability_container_table_head_row_element'>Hidden ability</th>
                                    </tr>
                                </thead>
                                <tbody className='ability_container_table_body'>
                                    {ability?.pokemon?.map((ap) => (
                                        <tr key={ap.pokemon.name} className='ability_container_table_body_row'>
                                            <td className='ability_container_table_body_row_sprite'>
                                                {pokemon?.map((p) =>
                                                    p.name === ap.pokemon.name &&
                                                        <img src={p.sprites.front_default} alt={p.name} loading="lazy" />
                                                )}
                                            </td>
                                            <td className='ability_container_table_body_row_name'>
                                                <Link
                                                    to={`/ability/${ability.name}`}
                                                    key={ap.pokemon.name}
                                                >
                                                    {ap.pokemon.name.replace(/-/g, ' ')}
                                                </Link>
                                            </td>
                                            <td className='ability_container_table_body_row_abilities'>
                                                {pokemon?.map((p) =>
                                                    p.name === ap.pokemon.name &&
                                                        <Link
                                                        to={`/abilities/${p?.abilities[0]?.ability?.name}`}
                                                        className={p?.abilities[0]?.ability?.name === ability?.name ? 'bold' : ''}>
                                                            {p?.abilities[0]?.ability?.name?.replace(/-/g, ' ')}
                                                        </Link>
                                                )}
                                            </td>
                                            <td className='ability_container_table_body_row_abilities'>
                                                {pokemon?.map((p) =>
                                                    p.name === ap.pokemon.name &&
                                                        <Link
                                                        to={`/abilities/${p?.abilities[1]?.ability?.name}`}
                                                        className={p?.abilities[1]?.ability?.name === ability?.name ? 'bold' : ''}>
                                                            {p?.abilities?.length > 1 ? (
                                                                p?.abilities[1]?.ability?.name?.replace(/-/g, ' ')
                                                            ) : (
                                                                '-'
                                                            )}
                                                        </Link>
                                                )}
                                            </td>
                                            <td className='ability_container_table_body_row_abilities'>
                                                {pokemon?.map((p) =>
                                                    p.name === ap.pokemon.name &&
                                                        <Link
                                                        to={`/abilities/${p?.abilities[2]?.ability?.name.name}`}
                                                        className={p?.abilities[2]?.ability?.name === ability?.name ? 'bold' : ''}>
                                                            {p?.abilities?.length > 2  ? (
                                                                p?.abilities[2]?.ability?.name?.replace(/-/g, ' ')
                                                            ) : (
                                                                '-'
                                                            )}
                                                        </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                        
                        <button className='back_button' onClick={() => navigate('/abilities')}> ᐸ Back to abilities</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default AbilityCard;