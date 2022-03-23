import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

import { Table, THead, TName, TRow, TEffect, TLink } from '../../components/BaseStyles/Table';
import { ModifiedSearch } from '../../components/BaseStyles/Inputs';
import { LeftTitle } from '../../components/BaseStyles/Headings';
import { ModifiedLeftTitle, StatusMoves } from './StyledMoves';

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
                            <LeftTitle>Moves</LeftTitle>
                            <ModifiedSearch>
                                <div>
                                    <label htmlFor="searchBar">Search</label>
                                    <input type="text" placeholder='Move Name' name='searchBar' id='searchBar' onChange={e => {setSearch(e.target.value)}} />
                                </div>
                            </ModifiedSearch>
                            <Table>
                                <THead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Type</th>
                                        <th>Effect</th>
                                    </tr>
                                </THead>
                                <tbody>
                                    {filteredMoves?.sort((a, b) => a.name.localeCompare(b.name))?.map((m) => (
                                        <TRow>
                                            <TName>
                                                <TLink
                                                    to={`/moves/${m.name}`}
                                                    key={m.name}
                                                >
                                                    {m?.name?.replace(/-/g, ' ')}
                                                </TLink>
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
                            <ModifiedLeftTitle>Status</ModifiedLeftTitle>
                            <Table>
                                <THead>
                                    <tr className='moves_status_table_head_row'>
                                        <th className='moves_status_table_head_row_element'>Status</th>
                                        <th className='moves_status_table_head_row_element'>Moves</th>
                                    </tr>
                                </THead>
                                <tbody>
                                    {status.filter(s => s.name !== 'none') 
                                        .sort((a, b) => a.name.localeCompare(b.name)).map((s) => (
                                            <TRow>
                                                <TName>
                                                    {s.name.replace(/-/g, ' ')}
                                                </TName>
                                                <td>
                                                    {s.moves.map((sm) => (
                                                        <StatusMoves
                                                        to={`/moves/${sm.name}`}
                                                        className='moves_status_table_body_row_moves_link'
                                                        >
                                                            <p>{sm.name.replace(/-/g, ' ')}</p>
                                                        </StatusMoves>
                                                    ))}
                                                </td>
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