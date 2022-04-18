import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';
import { BackButton } from '../../../components/BaseStyles/Inputs';
import { MainBig } from '../../../components/BaseStyles/Sizing';
import { CardTitle } from '../../../components/BaseStyles/Headings';
import Damage from './Damage/Damage.TypeCard';
import Moves from './Moves/Moves.TypeCard';
import Pokemon from './Pokemon/Pokemon.TypeCard';


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

    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=899')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setPokemon(results.map((res) => res.data));
        });
    }, []);

    const [moves, setMoves] = useState([]);

    useEffect(() => {
        axios
        .get('https://pokeapi.co/api/v2/move?limit=826')
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setMoves(results.map((res) => res.data));
        });
    }, []);    

    const title = `${name}`;

    useEffect(() => {
        document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | Types | PokéInfo`;
     }, [title]);

    return (
        <MainBig>
            {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
            ) : (
                <>
                    <CardTitle>{type?.name}</CardTitle>

                    <Damage 
                        type={type}
                    />

                    <Pokemon 
                        type={type}
                        pokemon={pokemon}
                    />

                    <Moves 
                        type={type}
                        moves={moves}
                    />

                    <BackButton onClick={() => navigate('/types')}> ᐸ Back to types</BackButton>
                </>
            )}
        </MainBig>
    )
}

export default TypeCard;