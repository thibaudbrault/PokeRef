import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

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

    return (
        <>
            <Header />
            <Nav />
            <main className='ability'>
            {loading ? (
                <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <h2 className='ability_title'>{ability?.name?.replace(/-/g, ' ') ?? ""}</h2>
                        <p className='ability_gen'>{ability?.generation?.name?.replace(/-/g, ' ') ?? ""}</p>
                        <div className="ability_container">

                            <div className="ability_container_inner">
                                <h3>Pokemon with <span>{ability?.name?.replace(/-/g, ' ')?? ""}</span></h3>
                                <table className='ability_table'>
                                    <thead className='ability_table_head'>
                                        <tr className='ability_table_head_row'>
                                            <th className='ability_table_head_row_element'>#</th>
                                            <th className='ability_table_head_row_element'>Name</th>
                                            <th className='ability_table_head_row_element'>Other ability</th>
                                        </tr>
                                    </thead>
                                    <tbody className='ability_table_body'>
                                        {ability?.pokemon?.map((ap) => 
                                            ap.is_hidden === false ? (
                                                <tr key={ap.pokemon.name} className='ability_table_body_row'>
                                                    <td className='ability_table_row_id'>aaaaaaaaaa</td>
                                                    <td className='ability_table_body_row_name'>
                                                        <Link
                                                            to={`/ability/${ability.name}`}
                                                            key={ap.pokemon.name}
                                                        >
                                                            {ap.pokemon.name.replace(/-/g, ' ')}
                                                        </Link>
                                                    </td>
                                                    <td className='ability_table_body_row_abilities'>aaaaaaaaaaa</td>
                                                </tr>
                                            ) : (
                                                null
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="ability_container_inner">
                                <h3><span>{ability?.name?.replace(/-/g, ' ')?? ""}</span> as a <span>hidden ability</span></h3>
                                <table className='ability_table'>
                                    <thead className='ability_table_head'>
                                        <tr className='ability_table_head_row'>
                                            <th className='ability_table_head_row_element'>#</th>
                                            <th className='ability_table_head_row_element'>Name</th>
                                            <th className='ability_table_head_row_element'>Other ability</th>
                                        </tr>
                                    </thead>
                                    <tbody className='ability_table_body'>
                                        {ability?.pokemon?.map((ap) => 
                                            ap.is_hidden === true ? (
                                                <tr key={ap.pokemon.name} className='ability_table_body_row'>
                                                    <td className='ability_table_row_id'>aaaaaaaaaa</td>
                                                    <td className='ability_table_body_row_name'>
                                                        <Link
                                                            to={`/ability/${ability.name}`}
                                                            key={ap.pokemon.name}
                                                        >
                                                            {ap.pokemon.name.replace(/-/g, ' ')}
                                                        </Link>
                                                    </td>
                                                    <td className='ability_table_body_row_ability'>aaaaaaaaaaa</td>
                                                </tr>
                                            ) : (
                                                null
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button onClick={() => navigate("/abilities")}>Go back</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default AbilityCard;