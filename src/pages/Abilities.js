import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TableVirtuoso } from 'react-virtuoso';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Abilities() {

    const[search, setSearch] = useState('');

    const [abilities, setAbilities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/ability?limit=267')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setAbilities(results.map((res) => res.data));
        });
    }, []);

    useEffect(() => {
        document.title = `Abilities | PokéInfo`;
     }, []);

    return (
        <>
            <Header />
            <Nav />
            <main className='abilities'>
                {loading ? (
                    <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <>
                        <h2 className='abilities_title'>Abilities</h2>
                        <div className='abilities_search'>
                            <input className='abilities_search_input' type="text" placeholder='Ability Name' name='searchBar' id='searchBar' onChange={event => {setSearch(event.target.value)}} />
                        </div>
                        <table className='abilities_table'>
                            <thead className='abilities_table_head'>
                                <tr className='abilities_table_head_row'>
                                    <th className='abilities_table_head_row_element'>Name</th>
                                    <th className='abilities_table_head_row_element'>Effect</th>
                                </tr>
                            </thead>
                            <tbody className='abilities_table_body'>
                                    {abilities.filter((abilities) => {
                                        if (search === "") {
                                            return abilities
                                        } else if (abilities.name.replace(/-/g, ' ').toLowerCase().includes(search.toLowerCase())) {
                                            return abilities
                                        }
                                    })
                                    .sort((a, b) => a.name.localeCompare(b.name)).map((a) => (
                                    <tr key={a.name} className='abilities_table_body_row'>
                                        <td className='abilities_table_body_row_name'>
                                            <Link
                                                to={`/abilities/${a.name}`}
                                                key={a.name}
                                            >
                                                {a.name.replace(/-/g, ' ')}
                                            </Link>
                                        </td>
                                        <td className='abilities_table_body_row_effect'>
                                            {a?.flavor_text_entries?.map((af) => 
                                                af.language.name === 'en' &&
                                                    <span>
                                                        {af.flavor_text}
                                                    </span>
                                            )}
                                        </td>
                                    </tr>
                                    ))}
                            </tbody>
                        </table>

                        {/* <TableVirtuoso 
                            style={{ height:'100%', width:'100%' }}
                            data={abilities}
                            fixedHeaderContent={(index, abilities) => (

                            )}
                        /> */}
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}
