import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../components/Wrapper/Header';
import Nav from '../../components/Wrapper/Nav';
import Footer from '../../components/Wrapper/Footer';

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

    const [toggleState, setToggleState] = useState(1);
    const toggleTable = (index) => {
        setToggleState(index);
    }

    useEffect(() => {
        document.title = `Locations | PokéInfo`;
    }, []);

    return (
        <>
            <Header />
            <Nav />
            <main className='locations'>
            {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
            ) : (
                <>
                    <nav className='locations_region'>
                        <button className={toggleState === 1 ? 'locations_region_active' : 'locations_region_element'} onClick={() => toggleTable(1)}><p>Kanto</p></button>

                        <button className={toggleState === 2 ? 'locations_region_active' : 'locations_region_element'} onClick={() => toggleTable(2)}><p>Johto</p></button>

                        <button className={toggleState === 3 ? 'locations_region_active' : 'locations_region_element'} onClick={() => toggleTable(3)}><p>Hoenn</p></button>

                        <button className={toggleState === 4 ? 'locations_region_active' : 'locations_region_element'} onClick={() => toggleTable(4)}><p>Sinnoh</p></button>

                        <button className={toggleState === 5 ? 'locations_region_active' : 'locations_region_element'} onClick={() => toggleTable(5)}><p>Unova</p></button>

                        <button className={toggleState === 6 ? 'locations_region_active' : 'locations_region_element'} onClick={() => toggleTable(6)}><p>Kalos</p></button>

                        <button className={toggleState === 7 ? 'locations_region_active' : 'locations_region_element'} onClick={() => toggleTable(7)}><p>Alola</p></button>

                        <button className={toggleState === 8 ? 'locations_region_active' : 'locations_region_element'} onClick={() => toggleTable(8)}><p>Galar</p></button>
                    </nav>

                    <section className={toggleState === 1 ? "active locations_container" : "hidden"}>
                        {locations?.map((l) => 
                            l?.name === 'kanto' &&
                                <ol className='locations_container_inner'>
                                    {l?.locations?.sort((a, b) => a.name.localeCompare(b.name))?.map((ln) => (
                                        <li>
                                            <Link
                                                to={`/locations`}
                                            >
                                                {ln?.name?.replace(/-/g, ' ')}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                        )}
                    </section>

                    <section className={toggleState === 2 ? "active locations_container" : "hidden"}>
                        {locations?.map((l) => 
                            l?.name === 'johto' &&
                                <ol className='locations_container_inner'>
                                    {l?.locations?.sort((a, b) => a.name.localeCompare(b.name))?.map((ln) => (
                                        <li>
                                            <Link
                                                to={`/locations/${ln?.name}`}
                                                key={ln?.name}
                                            >
                                                {ln?.name?.replace(/-/g, ' ')}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                        )}
                    </section>

                    <section className={toggleState === 3 ? "active locations_container" : "hidden"}>
                        {locations?.map((l) => 
                            l?.name === 'hoenn' &&
                                <ol className='locations_container_inner'>
                                    {l?.locations?.sort((a, b) => a.name.localeCompare(b.name))?.map((ln) => (
                                        <li>
                                            <Link
                                                to={`/locations`}
                                            >
                                                {ln?.name?.replace(/-/g, ' ')}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                        )}
                    </section>

                    <section className={toggleState === 4 ? "active locations_container" : "hidden"}>
                        {locations?.map((l) => 
                            l?.name === 'sinnoh' &&
                                <ol className='locations_container_inner'>
                                    {l?.locations?.sort((a, b) => a.name.localeCompare(b.name))?.map((ln) => (
                                        <li>
                                            <Link
                                                to={`/locations`}
                                            >
                                                {ln?.name?.replace(/-/g, ' ')}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                        )}
                    </section>

                    <section className={toggleState === 5 ? "active locations_container" : "hidden"}>
                        {locations?.map((l) => 
                            l?.name === 'unova' &&
                                <ol className='locations_container_inner'>
                                    {l?.locations?.sort((a, b) => a.name.localeCompare(b.name))?.map((ln) => (
                                        <li>
                                            <Link
                                                to={`/locations`}
                                            >
                                                {ln?.name?.replace(/-/g, ' ')}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                        )}
                    </section>

                    <section className={toggleState === 6 ? "active locations_container" : "hidden"}>
                        {locations?.map((l) => 
                            l?.name === 'kalos' &&
                                <ol className='locations_container_inner'>
                                    {l?.locations?.sort((a, b) => a.name.localeCompare(b.name))?.map((ln) => (
                                        <li>
                                            <Link
                                                to={`/locations`}
                                            >
                                                {ln?.name?.replace(/-/g, ' ')}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                        )}
                    </section>

                    <section className={toggleState === 7 ? "active locations_container" : "hidden"}>
                        {locations?.map((l) => 
                            l?.name === 'alola' &&
                                <ol className='locations_container_inner'>
                                    {l?.locations?.sort((a, b) => a.name.localeCompare(b.name))?.map((ln) => (
                                        <li>
                                            <Link
                                                to={`/locations`}
                                            >
                                                {ln?.name?.replace(/-/g, ' ')}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                        )}
                    </section>

                    <section className={toggleState === 8 ? "active locations_container" : "hidden"}>
                        <p className='locations_container_void'>No data for Galar</p>
                    </section>

                </>
            )}
            </main>
            <Footer />
        </>
  )
}
