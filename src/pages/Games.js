import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Games() {

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get("https://pokeapi.co/api/v2/generation")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setGames(results.map((res) => res.data));
        });
    }, []);

    console.log(games);

    return (
        <>
            <Header />
            <Nav />
            <main className="games">
                <ol className="games_container">
                    {loading ? (
                        <BarWave width="40px" height="20px" color="#cc0000" />
                    ) : (
                        games.map((g) => (
                            <li className="games_container_inner">
                                <h2 className='games_container_inner_title'>{g.name}</h2>
                                <p className='games_container_inner_region'>{g.main_region.name}</p>
                                <div className='games_container_inner_version'>
                                    {g.version_groups.map((gv) => (
                                        <p>{gv.name}</p>
                                    ))}
                                </div>
                                <div className='games_container_inner_pokemon'>
                                    {g.pokemon_species.map((gp) => (
                                        <p>{gp.name}</p>
                                    ))}
                                </div>
                                <div className='games_container_inner_moves'>
                                    {g.moves.map((gm) => (
                                        <p>{gm.name}</p>
                                    ))}
                                </div>
                                <div className='games_container_inner_abilities'>
                                    {g.abilities.map((ga) => (
                                        <p>{ga.name}</p>
                                    ))}
                                </div>
                                <div className='games_container_inner_types'>
                                    {g.types.map((gt) => (
                                        <p>{gt.name}</p>
                                    ))}
                                </div>
                            </li>
                        ))
                    )}
                </ol>
            </main>
            <Footer />
        </>
  )
}
