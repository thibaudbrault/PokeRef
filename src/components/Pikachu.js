import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const Pikachu = () => {

    const [pikachu, setPikachu] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=500&offset=898`)
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setPikachu(results.map((res) => res.data));
        });
    }, []);


    return (
        <>
            <Header />
            <Nav />
            <main className='pikachu'>
                {loading ? (
                    <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <ol className='pikachu_container'>
                        {pikachu?.map((p) => 
                            p?.name?.includes('pikachu') && !p?.name?.includes('gmax') && !p?.name?.includes('starter') && !p?.name?.includes('world') &&
                                <li key={p.name} className='pikachu_container_inner'>
                                    <div className='pikachu_container_inner_image'>
                                        <>
                                            <img className='pikachu_container_inner_image_sprite' src={p.sprites.front_default} alt={p.name} loading='lazy' />
                                            <img className='pikachu_container_inner_image_shiny' src={p.sprites.front_shiny} alt=' ' loading='lazy' />
                                        </>
                                    </div>
                                    <p>#025</p>
                                    <Link
                                        to={`/pokemon/${p.name}`}
                                        key={p.name}
                                    >
                                        <h2>
                                            {p?.name?.replace(/-/g, ' ')}
                                        </h2>
                                    </Link>
                                    <div className='pikachu_container_inner_types'>
                                        {p?.types?.map((pt) => (
                                            <div id={pt.type.name} className='pikachu_container_inner_types_element'>
                                                <img alt={pt.type.name} />
                                                <Link
                                                    to={`/types/${pt.type.name}`}
                                                >
                                                    {pt?.type?.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                        )}
                    </ol>
                )}
            </main>
            <Footer />
        </>
    )
}

export default Pikachu;