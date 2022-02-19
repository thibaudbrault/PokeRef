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

    const[version, setVersion] = useState('ultra-sun-ultra-moon')

    const title = `${name}`;

    useEffect(() => {
        document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | Pokémon | PokéInfo`;
     }, [title]);

    return (
        <>
            <Header />
            <Nav />
                <main className='pokemon'>
                    <h2 className='pokemon_title'>{pokemon.name}</h2>
                    <nav className='pokemon_gen'>
                        <ol className='pokemon_gen_list'>
                            {pokemon?.id < 152 &&
                                <li className='pokemon_gen_list_dropdown'>
                                    <button className='pokemon_gen_list_dropdown_button'>Gen I</button>
                                    <div className='pokemon_gen_list_dropdown_content'>
                                        <button onClick={() => setVersion('red-blue')}>Red / Blue</button>
                                        <button onClick={() => setVersion('yellow')}>Yellow</button>
                                    </div>
                                </li>
                            }
                            {pokemon?.id < 252 &&
                                <li className='pokemon_gen_list_dropdown'>
                                    <button className='pokemon_gen_list_dropdown_button'>Gen II</button>
                                    <div className='pokemon_gen_list_dropdown_content'>
                                        <button onClick={() => setVersion('gold-silver')}>Gold / Silver</button>
                                        <button onClick={() => setVersion('crystal')}>Crystal</button>
                                    </div>
                                </li>
                            }
                            {pokemon?.id < 387 &&
                                <li className='pokemon_gen_list_dropdown'>
                                    <button className='pokemon_gen_list_dropdown_button'>Gen III</button>
                                    <div className='pokemon_gen_list_dropdown_content'>
                                        <button onClick={() => setVersion('ruby-sapphire')}>Ruby / Sapphire</button>
                                        <button onClick={() => setVersion('emerald')}>Emerald</button>
                                        <button onClick={() => setVersion('firered-greenleaf')}>FireRed / GreenLeaf</button>
                                    </div>
                                </li>
                            }
                            {pokemon?.id < 494 &&
                                <li className='pokemon_gen_list_dropdown'>
                                    <button className='pokemon_gen_list_dropdown_button'>Gen IV</button>
                                    <div className='pokemon_gen_list_dropdown_content'>
                                        <button onClick={() => setVersion('diamond-pearl')}>Diamond / Pearl</button>
                                        <button onClick={() => setVersion('platinum')}>Platinum</button>
                                        <button onClick={() => setVersion('heartgold-soulsilver')}>HeartGold / SoulSilver</button>
                                    </div>
                                </li>
                            }
                            {pokemon?.id < 650 &&
                                <li className='pokemon_gen_list_dropdown'>
                                    <button className='pokemon_gen_list_dropdown_button'>Gen V</button>
                                    <div className='pokemon_gen_list_dropdown_content'>
                                        <button onClick={() => setVersion('black-white')}>Black / White</button>
                                        <button onClick={() => setVersion('black-2-white-2')}>Black 2 / White 2</button>
                                    </div>
                                </li>
                            }
                            {pokemon?.id < 722 &&
                                <li className='pokemon_gen_list_dropdown'>
                                    <button className='pokemon_gen_list_dropdown_button'>Gen VI</button>
                                    <div className='pokemon_gen_list_dropdown_content'>
                                        <button onClick={() => setVersion('x-y')}>X / Y</button>
                                        <button onClick={() => setVersion('omega-ruby-alpha-sapphire')}>Omega Ruby Alpha / Sapphire</button>
                                    </div>
                                </li>
                            }
                            {pokemon?.id < 810 &&
                                <li className='pokemon_gen_list_dropdown'>
                                    <button className='pokemon_gen_list_dropdown_button'>Gen VII</button>
                                    <div className='pokemon_gen_list_dropdown_content'>
                                        <button onClick={() => setVersion('sun-moon')}>Sun / Moon</button>
                                        <button onClick={() => setVersion('ultra-sun-ultra-moon')}>Ultra Sun / Ultra Moon</button>
                                        <button onClick={() => setVersion('lets-go-pikachu-lets-go-eevee')}>Let's Go Pikachu / Let's Go Eevee</button>
                                    </div>
                                </li>
                            }
                            {pokemon?.id < 899 &&
                                <li className='pokemon_gen_list_dropdown'>
                                    <button className='pokemon_gen_list_dropdown_button'>Gen VIII</button>
                                    <div className='pokemon_gen_list_dropdown_content'>
                                        <button onClick={() => setVersion('sword-shield')}>Sword / Shield</button>
                                    </div>
                                </li>
                            }
                        </ol>
                    </nav>
                    <div className='pokemon_sprite'>
                        <img className='pokemon_sprite_image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon?.name} />
                    </div>
                    <button className='back_button' onClick={() => navigate("/")}> ᐸ Back to pokemon</button>
                </main>
            <Footer />
        </>
    )
}

export default PokemonCard;