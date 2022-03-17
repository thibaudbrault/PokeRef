import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../components/Wrapper/Header/Header';
import Nav from '../../components/Wrapper/Nav/Nav';
import Footer from '../../components/Wrapper/Footer/Footer';

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

    const[version, setVersion] = useState('red-blue');

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
                                <div className='machines_search_input'>
                                    <label htmlFor="searchBar">Search</label>
                                    <input type="text" placeholder='Move Name' name='searchBar' id='searchBar' onChange={e => {setSearch(e.target.value)}} />
                                </div>
                            </div>

                            <nav className='machines_nav'>
                                <ol className='machines_nav_list'>
                                    <li className='machines_nav_list_dropdown'>
                                        <button className='machines_nav_list_dropdown_button'>Gen I</button>
                                        <div className='machines_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('red-blue')}>Red / Blue</button>
                                            <button onClick={() => setVersion('yellow')}>Yellow</button>
                                        </div>
                                    </li>
                                    <li className='machines_nav_list_dropdown'>
                                        <button className='machines_nav_list_dropdown_button'>Gen II</button>
                                        <div className='machines_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('gold-silver')}>Gold / Silver</button>
                                            <button onClick={() => setVersion('crystal')}>Crystal</button>
                                        </div>
                                    </li>
                                    <li className='machines_nav_list_dropdown'>
                                        <button className='machines_nav_list_dropdown_button'>Gen III</button>
                                        <div className='machines_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('ruby-sapphire')}>Ruby / Sapphire</button>
                                            <button onClick={() => setVersion('emerald')}>Emerald</button>
                                            <button onClick={() => setVersion('firered-greenleaf')}>FireRed / GreenLeaf</button>
                                        </div>
                                    </li>
                                    <li className='machines_nav_list_dropdown'>
                                        <button className='machines_nav_list_dropdown_button'>Gen IV</button>
                                        <div className='machines_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('diamond-pearl')}>Diamond / Pearl</button>
                                            <button onClick={() => setVersion('platinum')}>Platinum</button>
                                            <button onClick={() => setVersion('heartgold-soulsilver')}>HeartGold / SoulSilver</button>
                                        </div>
                                    </li>
                                    <li className='machines_nav_list_dropdown'>
                                        <button className='machines_nav_list_dropdown_button'>Gen V</button>
                                        <div className='machines_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('black-white')}>Black / White</button>
                                            <button onClick={() => setVersion('black-2-white-2')}>Black 2 / White 2</button>
                                        </div>
                                    </li>
                                    <li className='machines_nav_list_dropdown'>
                                        <button className='machines_nav_list_dropdown_button'>Gen VI</button>
                                        <div className='machines_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('x-y')}>X / Y</button>
                                            <button onClick={() => setVersion('omega-ruby-alpha-sapphire')}>Omega Ruby Alpha / Sapphire</button>
                                        </div>
                                    </li>
                                    <li className='machines_nav_list_dropdown'>
                                        <button className='machines_nav_list_dropdown_button'>Gen VII</button>
                                        <div className='machines_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('sun-moon')}>Sun / Moon</button>
                                            <button onClick={() => setVersion('ultra-sun-ultra-moon')}>Ultra Sun / Ultra Moon</button>
                                            <button onClick={() => setVersion('lets-go-pikachu-lets-go-eevee')}>Let's Go Pikachu / Let's Go Eevee</button>
                                        </div>
                                    </li>
                                    <li className='machines_nav_list_dropdown'>
                                        <button className='machines_nav_list_dropdown_button'>Gen VIII</button>
                                        <div className='machines_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('sword-shield')}>Sword / Shield</button>
                                        </div>
                                    </li>
                                </ol>
                            </nav>

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
                                        ma?.version_group?.name === version &&
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