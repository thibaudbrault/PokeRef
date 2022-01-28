import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Types() {

    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get("https://pokeapi.co/api/v2/type?limit=18")
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

    return (
        <>
            <Header />
            <Nav />
            <main className='types'>
                {loading ? (
                    <BarWave width="40px" height="20px" color="#cc0000" />
                    ) : (
                    <ul className='types_container'>
                        {types.map((t) => (
                            <li id={t.name} key={t.name} className='types_container_element'>
                                <a href="/types">
                                    <img alt={t.name} />
                                    <h2>{t.name}</h2>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
            <Footer />
        </>
  )
}
