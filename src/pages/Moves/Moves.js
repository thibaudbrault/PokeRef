import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import { Table, THead, TName, TRow, TEffect, TLink } from '../../components/BaseStyles/Table';
import { ModifiedSearch, Input } from '../../components/BaseStyles/Inputs';
import { LeftTitle } from '../../components/BaseStyles/Headings';
import { ModifiedLeftTitle, MovesSection, StatusMoves, TCategory, TType } from './StyledMoves';
import { MainBig } from '../../components/BaseStyles/Sizing';
import { Type } from '../../components/BaseStyles/Themes';
import { MethodNav } from '../../components/BaseStyles/Navbars';

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
        <MainBig>
            {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
            ) : (
                <>
                    <MethodNav>
                        <button className={toggleState === 1 ? 'button_active' : ''} onClick={() => toggleTable(1)}><p>Moves</p></button>
                        <button className={toggleState === 2 ? 'button_active' : ''} onClick={() => toggleTable(2)}><p>Status</p></button>
                    </MethodNav>

                    <MovesSection visibility={toggleState === 1}>
                        <LeftTitle>Moves</LeftTitle>
                        <ModifiedSearch>
                            <Input>
                                <label htmlFor="searchBar">Search</label>
                                <input type="text" placeholder='Move Name' name='searchBar' id='searchBar' onChange={e => {setSearch(e.target.value)}} />
                            </Input>
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
                                        <TCategory id={m?.damage_class?.name}>
                                            <div>
                                                <img alt={m.damage_class.name} />
                                                <span>{m?.damage_class?.name}</span>
                                            </div>
                                        </TCategory>
                                        <TType>
                                            <Type id={m.type.name}>
                                                <Link
                                                    to={`/types/${m.type.name}`}>
                                                    <img alt={m.type.name} />
                                                    <span>{m?.type?.name}</span>
                                                </Link>
                                            </Type>
                                        </TType>
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
                    </MovesSection>

                    <MovesSection visibility={toggleState === 2}>
                        <ModifiedLeftTitle>Status</ModifiedLeftTitle>
                        <Table>
                            <THead>
                                <tr>
                                    <th>Status</th>
                                    <th>Moves</th>
                                </tr>
                            </THead>
                            <tbody>
                                {status.filter(s => s.name !== 'none') 
                                    .sort((a, b) => a.name.localeCompare(b.name)).map((s) => (
                                        <TRow>
                                            <TName>
                                                {s.name.replace(/-/g, ' ')}
                                            </TName>
                                            <StatusMoves>
                                                {s.moves.map((sm) => (
                                                    <Link
                                                        to={`/moves/${sm.name}`}
                                                    >
                                                        <p>{sm.name.replace(/-/g, ' ')}</p>
                                                    </Link>
                                                ))}
                                            </StatusMoves>
                                        </TRow>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </MovesSection>
                </>
            )}
        </MainBig>
    )
}

export default Moves;