import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PokemonCard = props => {

    const { name } = useParams();
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

    return (
        <h2>{pokemon.name}</h2>
    )
}

export default PokemonCard;