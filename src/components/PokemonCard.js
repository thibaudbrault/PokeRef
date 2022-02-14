import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const PokemonCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setPokemon(results);
        });
    }, [name]);

    console.log(pokemon);

    const title = `${name}`;

    useEffect(() => {
        document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | Pokémon | PokéInfo`;
     }, [title]);

    return (
        <>
            <Header />
            <Nav />
                <main className='pokemon'>
                    <h2>{pokemon.name}</h2>

                    <button className='pokemon_button' onClick={() => navigate("/")}> ᐸ Back to pokemon</button>
                </main>
            <Footer />
        </>
    )
}

export default PokemonCard;