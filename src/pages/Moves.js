import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Moves() {

    const [moves, setMoves] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get("https://pokeapi.co/api/v2/move?limit=826")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setMoves(results.map((res) => res.data));
        });
    }, []);

    const [status, setStatus] = useState([]);

    useEffect(() => {
        axios
        .get("https://pokeapi.co/api/v2/move-ailment?limit=22")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setStatus(results.map((res) => res.data));
        });
    }, []);

    return (
        <>
            <Header />
            <Nav />
            <main className='moves'>
                {loading ? (
                <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <h2 className='moves_title'>Moves</h2>
                        <table className='moves_table'>
                            <thead className='moves_table_head'>
                                <tr className='moves_table_head_row'>
                                    <th className='moves_table_head_row_element'>Name</th>
                                    <th className='moves_table_head_row_element'>Category</th>
                                    <th className='moves_table_head_row_element'>Type</th>
                                </tr>
                            </thead>
                            <tbody className='moves_table_body'>
                                    {moves.sort((a, b) => a.name.localeCompare(b.name)).map((m) => (
                                    <tr key={m.name} className='moves_table_body_row'>
                                        <td className='moves_table_body_row_name'>
                                        <Link
                                            to={`/moves/${m.name}`}
                                            key={m.name}
                                        >
                                            {m.name.replace(/-/g, ' ')}
                                        </Link>
                                        </td>
                                        <td>
                                            <div className='moves_table_body_row_category' id={m.damage_class.name}>
                                                <img alt={m.damage_class.name} />
                                                <span>{m.damage_class.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='moves_table_body_row_type' id={m.type.name}>
                                                <img alt={m.type.name} />
                                                <span>{m.type.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                            </tbody>
                        </table>
                        <h2 className='status_title'>Status</h2>
                        <table className="status_table">
                            <thead className='status_table_head'>
                                <tr className='status_table_head_row'>
                                    <th className='status_table_head_row_element'>Status</th>
                                    <th className='status_table_head_row_element'>Moves</th>
                                </tr>
                            </thead>
                            <tbody className='status_table_body'>
                                {status.filter(s => s.name !== 'none') 
                                    .sort((a, b) => a.name.localeCompare(b.name)).map((s) => (
                                        <tr key={s.id} className='status_table_body_row'>
                                            <td className='status_table_body_row_name'>
                                                <Link
                                                    to={`/moves/${s.name}`}
                                                    key={s.name}
                                                >
                                                    {s.name.replace(/-/g, ' ')}
                                                </Link>
                                            </td>
                                            <td className='status_table_body_row_moves'>{s.moves.map((sm) => (
                                                <p>{sm.name}</p>
                                            ))}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}
