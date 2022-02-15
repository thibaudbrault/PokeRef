import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Items() {

    const[search, setSearch] = useState('');

    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/machine?limit=1700')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setMachines(results.map((res) => res.data));
        });
    }, []);

    useEffect(() => {
        document.title = `Machines | PokéInfo`;
     }, []);

    return (
        <>
            <Header />
            <Nav />
            <main className='machines'>
                {loading ? (
                    <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                        <>
                            <h2 className='machines_title'>Machines</h2>
                            <div className='machines_search'>
                                <input className='machines_search_input' type="text" placeholder='Move Name' name='searchBar' id='searchBar' onChange={event => {setSearch(event.target.value)}} />
                            </div>
                            <table className='machines_table'>
                            <thead className='machines_table_head'>
                                <tr className='machines_table_head_row'>
                                    <th className='machines_table_head_row_element'>Name</th>
                                    <th className='machines_table_head_row_element'>Moves</th>
                                </tr>
                            </thead>
                            <tbody className='machines_table_body'>
                                    {machines.filter((machines) => {
                                        if (search === "") {
                                            return machines
                                        } else if (machines.move.name.replace(/-/g, ' ').toLowerCase().includes(search.toLowerCase())) {
                                            return machines
                                        }
                                    })
                                    .map((ma) => 
                                        
                                            <tr key={ma?.id} className='machines_table_body_row'>
                                                <td className='machines_table_body_row_name'>
                                                    {ma?.item?.name.toUpperCase()}
                                                </td>
                                                <td className='machines_table_body_row_element'>
                                                    <Link
                                                        to={`/moves/${ma?.move?.name}`}
                                                        key={ma?.move?.name}
                                                    >
                                                        {ma?.move?.name.replace(/-/g, ' ')}
                                                    </Link>
                                                </td>
                                            </tr>
                                    )}
                            </tbody>
                        </table>
                        </>
                )}
            </main>
            <Footer />
        </>
    )
}