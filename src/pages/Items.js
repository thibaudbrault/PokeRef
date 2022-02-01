import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Items() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/item?limit=1608')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setItems(results.map((res) => res.data));
        });
    }, []);

    return (
        <>
            <Header />
            <Nav />
            <main className='items'>
                {loading ? (
                    <BarWave width='40px' height='20px' color='#cc0000' />
                    ) : (
                        <div className='items_container'>
                            <table className='items_table'>
                                <thead className='items_table_head'>
                                    <tr className='items_table_head_row'>
                                        <th className='items_table_head_row_element'>Name</th>
                                        <th className='items_table_head_row_element'>Category</th>
                                        <th className='items_table_head_row_element'>Effect</th>
                                    </tr>
                                </thead>
                                <tbody className='items_table_body'>
                                    {items.sort((a, b) => a.name.localeCompare(b.name)).map((i) => (
                                        <tr key={i.name} className='items_table_body_row'>
                                            <td className='items_table_body_row_name'>
                                                <div className='items_table_body_row_name_inner'>
                                                    <img src={i.sprites.default} alt='' />
                                                    <span>{i.name.replace(/-/g, ' ')}</span>
                                                </div>
                                            </td>
                                            <td className='items_table_body_row_element'>
                                                {i.category.name}
                                            </td>
                                            <td className='items_table_body_row_effect'>
                                                {i.effect_entries.map((ie) => (
                                                    <span>{ie.effect}</span>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
            </main>
            <Footer />
        </>
  )
}
