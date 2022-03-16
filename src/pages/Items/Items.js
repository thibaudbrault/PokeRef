import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function Items() {

    const[search, setSearch] = useState('');

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

    useEffect(() => {
        document.title = `Items | PokéInfo`;
     }, []);

    return (
        <>
            <Header />
            <Nav />
            <main className='items'>
                {loading ? (
                    <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <>
                        <h2 className='items_title'>Items</h2>
                        <div className='items_search'>
                            <div className='items_search_input'>
                                <label htmlFor="searchBar">Search</label>
                                <input type="text" placeholder='Move Name' name='searchBar' id='searchBar' onChange={e => {setSearch(e.target.value)}} />
                            </div>
                        </div>
                        <table className='items_table'>
                            <thead className='items_table_head'>
                                <tr className='items_table_head_row'>
                                    <th className='items_table_head_row_element'>Name</th>
                                    <th className='items_table_head_row_element'>Category</th>
                                    <th className='items_table_head_row_element'>Effect</th>
                                </tr>
                            </thead>
                            <tbody className='items_table_body'>
                                {items.filter((items) => {
                                    if (search === "") {
                                        return items
                                    } else if (items.name.replace(/-/g, ' ').toLowerCase().includes(search.toLowerCase())) {
                                        return items
                                    }
                                })
                                .sort((a, b) => a.name.localeCompare(b.name)).map((i) => 
                                    i?.category?.name !== 'dynamax-crystals' && i?.category?.name !== 'all-machines' && i?.category?.name !== 'all-mail' && i?.category?.name !== 'unused' && i?.category?.name !== 'data-cards' && i?.category?.name !== 'plot-advancement' && i?.category?.name !== 'species-candies' && i?.category?.name !== 'gameplay' &&
                                        <tr key={i.name} className='items_table_body_row'>
                                            <td className='items_table_body_row_name'>
                                                <div className='items_table_body_row_name_inner'>
                                                    <img src={i.sprites.default} alt='' />
                                                    <Link
                                                        to={`/items/${i.name}`}
                                                        key={i.name}
                                                    >
                                                        <span>{i.name.replace(/-/g, ' ')}</span>
                                                    </Link>
                                                </div>
                                            </td>
                                            <td className='items_table_body_row_element'>
                                                {i.category.name.replace(/-/g, ' ')}
                                            </td>
                                            <td className='items_table_body_row_effect'>
                                                {i.effect_entries.map((ie) => (
                                                    <span>{ie.short_effect}</span>
                                                ))}
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
