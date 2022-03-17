import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../components/Wrapper/Header/Header';
import Nav from '../../components/Wrapper/Nav/Nav';
import Footer from '../../components/Wrapper/Footer/Footer';

export default function Types() {

    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/type?limit=18')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setTypes(results.map((res) => res.data));
        });
    }, []);

    useEffect(() => {
        document.title = `Types | PokéInfo`;
     }, []);

    return (
        <>
            <Header />
            <Nav />
            <main className='types'>
                {loading ? (
                    <BarWave width='40px' height='20px' color='#cc0000' />
                    ) : (
                    <ul className='types_container'>
                        {types.sort((a, b) => a.name.localeCompare(b.name)).map((t) => (
                            <li id={t.name} key={t.name} className='types_container_element'>
                                <Link
                                    to={`/types/${t.name}`}
                                    key={t.name}
                                >
                                    <img alt={t.name} />
                                    <h2>{t.name}</h2>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
            <Footer />
        </>
  )
}
