import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';
import { MainSmall } from '../../BaseStyles/Sizing';
import { PikachuPage } from './StyledPikachu';
import { PokemonElement, PokemonImage, PokemonTypes, SpriteNormal, SpriteShiny } from '../../../pages/Pokemon/StyledPokemon';

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
        <MainSmall>
            {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
            ) : (
                <PikachuPage>
                    {pikachu?.map((p) => 
                        p?.name?.includes('pikachu') && !p?.name?.includes('gmax') && !p?.name?.includes('starter') && !p?.name?.includes('world') &&
                            <PokemonElement>
                                <PokemonImage>
                                    <SpriteNormal src={p.sprites.front_default} alt={p.name} loading='lazy' />
                                    <SpriteShiny src={p.sprites.front_shiny} alt=' ' loading='lazy' />
                                </PokemonImage>
                                <p>#025</p>
                                <Link
                                    to={`/pokemon/${p.name}`}
                                    key={p.name}
                                >
                                    <h2>
                                        {p?.name?.replace(/-/g, ' ')}
                                    </h2>
                                </Link>
                                <PokemonTypes>
                                    {p?.types?.map((pt) => (
                                        <div id={pt.type.name}>
                                            <img alt={pt.type.name} />
                                            <Link
                                                to={`/types/${pt.type.name}`}
                                            >
                                                {pt?.type?.name}
                                            </Link>
                                        </div>
                                    ))}
                                </PokemonTypes>
                            </PokemonElement>
                    )}
                </PikachuPage>
            )}
        </MainSmall>
    )
}

export default Pikachu;