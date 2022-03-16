import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../components/Wrapper/Header';
import Nav from '../../components/Nav';
import Footer from '../../components/Wrapper/Footer';

function Moves() {

    const [search, setSearch] = useState('');
    const [filteredMoves, setFilteredMoves] = useState([])

    const [moves, setMoves] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/move?limit=826')
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
        .get('https://pokeapi.co/api/v2/move-ailment?limit=22')
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

    useEffect(() => {
        setFilteredMoves(
            moves.filter((moves) =>
                moves.name.replace(/-/g, ' ').toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, moves]);

    const [toggleState, setToggleState] = useState(1);
    const toggleTable = (index) => {
        setToggleState(index);
    }

    useEffect(() => {
        document.title = `Moves | PokéInfo`;
     }, []);


    return (
        <>
            <Header />
            <Nav />
            <main className='moves'>
                {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <>
                        <nav className='moves_nav'>
                            <button className={toggleState === 1 ? 'moves_nav_active' : 'moves_nav_element'} onClick={() => toggleTable(1)}><p>Moves</p></button>
                            <button className={toggleState === 2 ? 'moves_nav_active' : 'moves_nav_element'} onClick={() => toggleTable(2)}><p>Status</p></button>
                        </nav>

                        <section className={toggleState === 1 ? "active" : "hidden"}>
                            <h2 className='moves_title'>Moves</h2>
                            <div className='moves_search'>
                                <div className='moves_search_input'>
                                    <label htmlFor="searchBar">Search</label>
                                    <input type="text" placeholder='Move Name' name='searchBar' id='searchBar' onChange={e => {setSearch(e.target.value)}} />
                                </div>
                            </div>
                            <table className='moves_table'>
                                <thead className='moves_table_head'>
                                    <tr className='moves_table_head_row'>
                                        <th className='moves_table_head_row_element'>Name</th>
                                        <th className='moves_table_head_row_element'>Category</th>
                                        <th className='moves_table_head_row_element'>Type</th>
                                        <th className='moves_table_head_row_element'>Effect</th>
                                    </tr>
                                </thead>
                                <tbody className='moves_table_body'>
                                    {filteredMoves?.sort((a, b) => a.name.localeCompare(b.name))?.map((m) => (
                                        <tr key={m.id} className='moves_table_body_row'>
                                            <td className='moves_table_body_row_name'>
                                            <Link
                                                to={`/moves/${m.name}`}
                                                key={m.name}
                                            >
                                                {m?.name?.replace(/-/g, ' ')}
                                            </Link>
                                            </td>
                                            <td>
                                                <div className='moves_table_body_row_category' id={m?.damage_class?.name}>
                                                    <img alt={m.damage_class.name} />
                                                    <span>{m?.damage_class?.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='moves_table_body_row_type' id={m.type.name}>
                                                    <img alt={m.type.name} />
                                                    <span>{m?.type?.name}</span>
                                                </div>
                                            </td>
                                            <td className='moves_table_body_row_effect'>
                                                {m?.flavor_text_entries?.map((mf) => 
                                                    mf.language.name === 'en' && mf.flavor_text !== 'Dummy Data' &&
                                                        <span>
                                                            {mf?.flavor_text}
                                                        </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>

                        <section className={toggleState === 2 ? "active" : "hidden"}>
                            <h2 className='moves_status_title'>Status</h2>
                            <table className='moves_status_table'>
                                <thead className='moves_status_table_head'>
                                    <tr className='moves_status_table_head_row'>
                                        <th className='moves_status_table_head_row_element'>Status</th>
                                        <th className='moves_status_table_head_row_element'>Moves</th>
                                    </tr>
                                </thead>
                                <tbody className='moves_status_table_body'>
                                    {status.filter(s => s.name !== 'none') 
                                        .sort((a, b) => a.name.localeCompare(b.name)).map((s) => (
                                            <tr key={s.id} className='moves_status_table_body_row'>
                                                <td className='moves_status_table_body_row_name'>
                                                    {s.name.replace(/-/g, ' ')}
                                                </td>
                                                <td className='moves_status_table_body_row_moves'>
                                                    {s.moves.map((sm) => (
                                                        <Link
                                                        to={`/moves/${sm.name}`}
                                                        className='moves_status_table_body_row_moves_link'
                                                        >
                                                            {sm.name.replace(/-/g, ' ')}
                                                        </Link>
                                                    ))}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </section>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default Moves;