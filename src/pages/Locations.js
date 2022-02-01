import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../components/Header';
import Nav from '../components/Nav';
import RegionNav from '../components/RegionNav';
import Footer from '../components/Footer';

export default function Locations() {

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/region?limit=7')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setLocations(results.map((res) => res.data));
        });
    }, []);

    return (
        <>
            <Header />
            <Nav />
            <RegionNav />
            <main className='locations'>
            {loading ? (
                    <BarWave width='40px' height='20px' color='#cc0000' />
                    ) : (
                    locations.map((l) => (
                        <div className='locations_container' id={l.name}>
                            <h2 className='locations_title'>{l.name}</h2>
                            <div className='locations_container_inner'>
                                {l.locations.sort((a, b) => a.name.localeCompare(b.name)).map((ln) => (
                                    <p>{ln.name.replace(/-/g, ' ')}</p>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </main>
            <Footer />
        </>
  )
}
