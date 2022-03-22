import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

import { Table, THead, TName, TRow, TEffect } from '../../components/BaseStyles/Table';
import { ModifiedSearch } from '../../components/BaseStyles/Inputs';
import { LeftTitle } from '../../components/BaseStyles/Headings';

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
                            <ModifiedSearch>
                                <div>
                                    <label htmlFor="searchBar">Search</label>
                                    <input type="text" placeholder='Move Name' name='searchBar' id='searchBar' onChange={e => {setSearch(e.target.value)}} />
                                </div>
                            </ModifiedSearch>
                            <Table>
                                <THead>
                                    <tr className='moves_table_head_row'>
                                        <th className='moves_table_head_row_element'>Name</th>
                                        <th className='moves_table_head_row_element'>Category</th>
                                        <th className='moves_table_head_row_element'>Type</th>
                                        <th className='moves_table_head_row_element'>Effect</th>
                                    </tr>
                                </THead>
                                <tbody className='moves_table_body'>
                                    {filteredMoves?.sort((a, b) => a.name.localeCompare(b.name))?.map((m) => (
                                        <TRow>
                                            <TName>
                                                <Link
                                                    to={`/moves/${m.name}`}
                                                    key={m.name}
                                                >
                                                    {m?.name?.replace(/-/g, ' ')}
                                                </Link>
                                            </TName>
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
                                            <TEffect>
                                                {m?.flavor_text_entries?.map((mf) => 
                                                    mf.language.name === 'en' && mf.flavor_text !== 'Dummy Data' &&
                                                        <span>
                                                            {mf?.flavor_text}
                                                        </span>
                                                )}
                                            </TEffect>
                                        </TRow>
                                    ))}
                                </tbody>
                            </Table>
                        </section>

                        <section className={toggleState === 2 ? "active" : "hidden"}>
                            <LeftTitle>Status</LeftTitle>
                            <Table>
                                <THead>
                                    <tr className='moves_status_table_head_row'>
                                        <th className='moves_status_table_head_row_element'>Status</th>
                                        <th className='moves_status_table_head_row_element'>Moves</th>
                                    </tr>
                                </THead>
                                <tbody className='moves_status_table_body'>
                                    {status.filter(s => s.name !== 'none') 
                                        .sort((a, b) => a.name.localeCompare(b.name)).map((s) => (
                                            <TRow>
                                                <td className='moves_status_table_body_row_name'>
                                                    {s.name.replace(/-/g, ' ')}
                                                </td>
                                                <td className='moves_status_table_body_row_moves'>
                                                    {s.moves.map((sm) => (
                                                        <Link
                                                        to={`/moves/${sm.name}`}
                                                        className='moves_status_table_body_row_moves_link'
                                                        >
                                                            <p>{sm.name.replace(/-/g, ' ')}</p>
                                                        </Link>
                                                    ))}</td>
                                            </TRow>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </section>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default Moves;