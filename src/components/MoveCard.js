import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const MoveCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [move, setMove] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/move/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setMove(results);
        });
    }, [name]);

    const maxPp = move?.pp * '1.6';

    return (
        <>
            <Header />
            <Nav />
            <main className='move'>
                {loading ? (
                <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <h2 className='move_title'>{move?.name?.replace(/-/g, ' ') ?? ""}</h2>
                        <section className='move_container'>
                            <table className='move_table'>
                                <tbody>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Type</th>
                                        <td className='move_table_row_element'>
                                            <div className='move_table_row_element_type' id={move?.type?.name}>
                                                <img alt={move?.type?.name} />
                                                <span>{move?.type?.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Category</th>
                                        <td className='move_table_row_element'>
                                            <div className='move_table_row_element_category' id={move?.damage_class?.name}>
                                                <img alt={move?.damage_class?.name} />
                                                <span>{move?.damage_class?.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Power</th>
                                        <td className='move_table_row_element'>{move?.power}</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>PP</th>
                                        <td className='move_table_row_element'>{move?.pp} (max. {maxPp})</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Accuracy</th>
                                        <td className='move_table_row_element'>{move?.accuracy}</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Status</th>
                                        <td className='move_table_row_element'>{move?.meta?.ailment?.name?.replace('none', '-')}</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Priority</th>
                                        <td className='move_table_row_element'>{move?.priority}</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Introduced</th>
                                        <td className='move_table_row_element'>{move?.generation?.name.replace(/-/g, ' ')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <button className='move_button' onClick={() => navigate("/moves")}> ᐸ Back to moves</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default MoveCard;