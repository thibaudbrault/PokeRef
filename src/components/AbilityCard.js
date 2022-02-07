import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

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

    console.log(ability);

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

    return (
        <>
            <Header />
            <Nav />
            <main className='ability'>
            {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <>
                        <h2 className='ability_title'>{ability?.name?.replace(/-/g, ' ') ?? ''}</h2>
                        <p className='ability_gen'>{ability?.generation?.name?.replace(/-/g, ' ') ?? ''}</p>

                        <section className='ability_container'>
                            <h3 className='ability_container_title'>Effect</h3>
                            {ability?.effect_entries?.map((ae) => 
                                ae?.language.name === 'en' &&
                                    <p className='ability_container_effect'>
                                        {ae.short_effect}
                                    </p>
                            )}
                            <h4 className='ability_container_subtitle'>Changes</h4>
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
                            <h3 className='ability_container_title'>Pokemon with <span>{ability?.name?.replace(/-/g, ' ')?? ''}</span></h3>
                            <table className='ability_container_table'>
                                <thead className='ability_container_table_head'>
                                    <tr className='ability_container_table_head_row'>
                                        <th className='ability_container_table_head_row_element'>#</th>
                                        <th className='ability_container_table_head_row_element'>Name</th>
                                        <th className='ability_container_table_head_row_element'>Other abilities</th>
                                    </tr>
                                </thead>
                                <tbody className='ability_container_table_body'>
                                    {ability?.pokemon?.map((ap) => 
                                        ap.is_hidden === false ? (
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
                                                        p?.abilities?.map((pa) => 
                                                            pa?.ability?.name === ability?.name &&
                                                            <span>{pa?.ability?.name}</span>
                                                        )
                                                    )}
                                                </td>
                                            </tr>
                                        ) : (
                                            null
                                        )
                                    )}
                                </tbody>
                            </table>
                        </section>

                        <section className='ability_container'>
                            <h3 className='ability_container_title'><span>{ability?.name?.replace(/-/g, ' ')?? ''}</span> as a <span>hidden ability</span></h3>
                            <table className='ability_container_table'>
                                <thead className='ability_container_table_head'>
                                    <tr className='ability_container_table_head_row'>
                                        <th className='ability_container_table_head_row_element'>#</th>
                                        <th className='ability_container_table_head_row_element'>Name</th>
                                        <th className='ability_container_table_head_row_element'>Other abilities</th>
                                    </tr>
                                </thead>
                                <tbody className='ability_container_table_body'>
                                    {ability?.pokemon?.map((ap) => 
                                        ap.is_hidden === true ? (
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
                                                <td className='ability_container_table_body_row_ability'>aaaaaaaaaaa</td>
                                            </tr>
                                        ) : (
                                            null
                                        )
                                    )}
                                </tbody>
                            </table>
                        </section>
                        
                        <button className='ability_button' onClick={() => navigate('/abilities')}> ᐸ Back to abilities</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default AbilityCard;