import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const TypeCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [type, setType] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/type/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setType(results);
        });
    }, [name]);

    console.log(type);

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=2000")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setPokemon(results.map((res) => res.data));
        });
    }, []);

    const nbPokemon = type?.pokemon?.length;

    return (
        <>
            <Header />
            <Nav />
            <main className="type">
                {loading ? (
                <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <h2 className='type_title'>{type.name}</h2>
                        <h3 className='type_subtitle'>{nbPokemon} Pokémon are <span>{type.name}</span> type</h3>
                        <div className="type_pokemon">
                            {type?.pokemon?.map((tp) => (
                                <div className='type_pokemon_inner'>
                                    {pokemon?.map((p) =>
                                        p.name === tp.pokemon.name ? (
                                            <img className='type_pokemon_inner_img' src={p.sprites.front_default} alt={pokemon.name} loading="lazy" />
                                        ) :(
                                            null
                                        )
                                    )}
                                    <p className='type_pokemon_inner_name'>{tp.pokemon.name}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => navigate("/types")}>Go back</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default TypeCard;