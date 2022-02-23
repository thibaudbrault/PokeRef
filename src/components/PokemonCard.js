import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

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

    const [species, setSpecies] = useState([]);

    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setSpecies(results);
        });
    }, [name]);

    const evolutionChainUrl = species?.evolution_chain?.url;

    const [evolution, setEvolution] = useState([]);

    useEffect(() => {
        axios
        .get(`${evolutionChainUrl}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setEvolution(results);
        });
    }, [evolutionChainUrl]);

    console.log(evolution)

    console.log(species)
    console.log(pokemon)

    const[version, setVersion] = useState('red');
    

    const height = (pokemon?.height * 0.1).toFixed(2);
    const weight = (pokemon?.weight * 0.1).toFixed(2);

    const female = species?.gender_rate / 8 * 100;
    const male = '100' - (species?.gender_rate / 8 * 100);

    const [toggleState, setToggleState] = useState(1);
    const toggleTable = (index) => {
        setToggleState(index);
    }

    const title = `${name}`;

    useEffect(() => {
        document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | Pokémon | PokéInfo`;
     }, [title]);

    return (
        <>
            <Header />
            <Nav />
            <main className='pokemon'>
                {loading ? (
                    <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <h2 className='pokemon_title'>{pokemon?.name}</h2>
                        <p className='pokemon_gen'>{species?.generation?.name?.replace(/-/g, ' ')}</p>

                        <nav className='pokemon_nav'>
                            <ol className='pokemon_nav_list'>
                                {pokemon?.id < 152 &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen I</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('red')}>Red</button>
                                            <button onClick={() => setVersion('blue')}>Blue</button>
                                            <button onClick={() => setVersion('yellow')}>Yellow</button>
                                        </div>
                                    </li>
                                }
                                {pokemon?.id < 252 &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen II</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('gold')}>Gold</button>
                                            <button onClick={() => setVersion('silver')}>Silver</button>
                                            <button onClick={() => setVersion('crystal')}>Crystal</button>
                                        </div>
                                    </li>
                                }
                                {pokemon?.id < 387 &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen III</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('ruby')}>Ruby</button>
                                            <button onClick={() => setVersion('sapphire')}>Sapphire</button>
                                            <button onClick={() => setVersion('emerald')}>Emerald</button>
                                            <button onClick={() => setVersion('firered')}>Fire Red</button>
                                            <button onClick={() => setVersion('greenleaf')}>Green Leaf</button>
                                        </div>
                                    </li>
                                }
                                {pokemon?.id < 494 &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen IV</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('diamond')}>Diamond</button>
                                            <button onClick={() => setVersion('pearl')}>Pearl</button>
                                            <button onClick={() => setVersion('platinum')}>Platinum</button>
                                            <button onClick={() => setVersion('heartgold')}>Heart Gold</button>
                                            <button onClick={() => setVersion('soulsilver')}>Soul Silver</button>
                                        </div>
                                    </li>
                                }
                                {pokemon?.id < 650 &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen V</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('black')}>Black</button>
                                            <button onClick={() => setVersion('white')}>White</button>
                                            <button onClick={() => setVersion('black-2')}>Black 2</button>
                                            <button onClick={() => setVersion('white-2')}>White 2</button>
                                        </div>
                                    </li>
                                }
                                {pokemon?.id < 722 &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen VI</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('x')}>X</button>
                                            <button onClick={() => setVersion('y')}>Y</button>
                                            <button onClick={() => setVersion('omega-ruby')}>Omega Ruby</button>
                                            <button onClick={() => setVersion('alpha-sapphire')}>Alpha Sapphire</button>
                                        </div>
                                    </li>
                                }
                                {pokemon?.id < 810 &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen VII</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('sun')}>Sun</button>
                                            <button onClick={() => setVersion('moon')}>Moon</button>
                                            <button onClick={() => setVersion('ultra-sun')}>Ultra Sun</button>
                                            <button onClick={() => setVersion('ultra-moon')}>Ultra Moon</button>
                                            <button onClick={() => setVersion('lets-go-pikachu')}>Let's Go Pikachu</button>
                                            <button onClick={() => setVersion('lets-go-eevee')}>Let's Go Eevee</button>
                                        </div>
                                    </li>
                                }
                                {pokemon?.id < 899 &&
                                    <li className='pokemon_nav_list_dropdown'>
                                        <button className='pokemon_nav_list_dropdown_button'>Gen VIII</button>
                                        <div className='pokemon_nav_list_dropdown_content'>
                                            <button onClick={() => setVersion('sword')}>Sword</button>
                                            <button onClick={() => setVersion('shield')}>Shield</button>
                                        </div>
                                    </li>
                                }
                            </ol>
                        </nav>

                        <section className='pokemon_data'>
                            <div className='pokemon_data_container'>
                                <ul className='pokemon_data_container_list'>
                                    <li className='pokemon_data_container_list_desc'>
                                        {species?.flavor_text_entries?.map((sf) => 
                                            sf?.language?.name === 'en' && sf?.version?.name === version && 
                                                <>
                                                    {sf?.flavor_text?.replace(/\\u000c/g, ' ')}
                                                </>
                                        )}
                                    </li>
                                    <li className='pokemon_data_container_list_types'>
                                        {pokemon?.types?.map((pt) => (
                                            <div id={pt.type.name} className='pokemon_data_container_list_types_element'>
                                                <img alt={pt.type.name} />
                                                <span>{pt.type.name}</span>
                                            </div>
                                        ))}
                                    </li>
                                </ul>
                                <table className='pokemon_data_container_table'>
                                    <tbody className='pokemon_data_container_table_body'>
                                        <tr className='pokemon_data_container_table_body_row'>
                                            <th className='pokemon_data_container_table_body_row_head'>
                                                National number
                                            </th>
                                            <td className='pokemon_data_container_table_body_row_element'>
                                                # {pokemon?.id?.toString()?.padStart(3, '0')}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_data_container_table_body_row'>
                                            <th className='pokemon_data_container_table_body_row_head'>
                                                Abilities
                                            </th>
                                            <td className='pokemon_data_container_table_body_row_element'>
                                                {pokemon?.abilities?.map((pa) => 
                                                    <p>
                                                        <Link
                                                        to={`/abilities/${pa.ability.name}`}
                                                        key={pa.ability.name}
                                                        >
                                                            {pa?.ability?.name?.replace(/-/g, ' ')}
                                                        </Link>
                                                        {pa?.is_hidden && 
                                                            <>
                                                                ‌‌ (hidden ability)
                                                            </>
                                                        }
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_data_container_table_body_row'>
                                            <th className='pokemon_data_container_table_body_row_head'>
                                                Height
                                            </th>
                                            <td className='pokemon_data_container_table_body_row_element'>
                                                {height.toString()} m
                                            </td>
                                        </tr>
                                        <tr className='pokemon_data_container_table_body_row'>
                                            <th className='pokemon_data_container_table_body_row_head'>
                                                Weight
                                            </th>
                                            <td className='pokemon_data_container_table_body_row_element'>
                                                {weight.toString()} kg
                                            </td>
                                        </tr>
                                        <tr className='pokemon_data_container_table_body_row'>
                                            <th className='pokemon_data_container_table_body_row_head'>
                                                Category
                                            </th>
                                            <td className='pokemon_data_container_table_body_row_element'>
                                                {species?.genera?.map((sg) => 
                                                    sg?.language?.name === 'en' &&
                                                    <>
                                                        {sg?.genus}
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_data_container_table_body_row'>
                                            <th className='pokemon_data_container_table_body_row_head'>
                                                Shape
                                            </th>
                                            <td className='pokemon_data_container_table_body_row_element'>
                                                {species?.shape?.name}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_data_container_table_body_row'>
                                            <th className='pokemon_data_container_table_body_row_head'>
                                                Color
                                            </th>
                                            <td className='pokemon_data_container_table_body_row_element'>
                                                {species?.color?.name}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='pokemon_data_more'>
                                <img className='pokemon_data_more_sprite' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon?.name} />
                                {species?.is_legendary === true && (
                                    <span className='pokemon_data_more_legendary'>Legendary</span>
                                )}
                                {species?.is_mythical === true && (
                                    <span className='pokemon_data_more_mythical'>Mythical</span>
                                )}
                            </div>
                        </section>

                        <section className='pokemon_evo'>
                            <h3 className='pokemon_evo_title'>Evolution chain</h3>
                            <div className='pokemon_evo_container'>
                                
                            </div>
                        </section>

                        <section className='pokemon_info'>
                            <div className='pokemon_info_container'>
                                <h3 className='pokemon_info_container_title'>Breeding</h3>
                                <table className='pokemon_info_container_table'>
                                    <tbody>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Gender
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {species?.gender_rate !== -1 ? (
                                                    <>
                                                        {male}% male, {female}% female
                                                    </>
                                                ) : (
                                                    <>
                                                        genderless
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Egg groups
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {species?.egg_groups?.map((seg) => 
                                                    <p>{seg?.name}</p>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Egg cycles
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                    {species?.hatch_counter} cycles ( steps)
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Baby trigger item
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {evolution?.baby_trigger_item !== null ? (
                                                    evolution?.baby_trigger_item?.name.replace(/-/g, ' ')
                                                ) : (
                                                    'None'
                                                )}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Habitat
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {species?.habitat !== null ? (
                                                    species?.habitat?.name
                                                ) : (
                                                    'Undiscovered'
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='pokemon_info_container'>
                                <h3 className='pokemon_info_container_title'>Training</h3>
                                <table className='pokemon_info_container_table'>
                                    <tbody>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                EV yield
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {pokemon?.stats?.map((ps) => 
                                                    ps?.effort !== 0 &&
                                                    <p>{ps?.effort} {ps?.stat?.name?.replace(/-/g, ' ')}</p>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Catch rate
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {species?.capture_rate}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Base happiness
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {species?.base_happiness}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Base experience
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {pokemon?.base_experience}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Growth rate
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {species?.growth_rate?.name.replace(/-/g, ' ')}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Held items
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {pokemon?.held_items?.length > 0 ? (
                                                    pokemon?.held_items?.map((ph) =>
                                                        <p>{ph?.item?.name?.replace(/-/g, ' ')}</p>
                                                    )
                                                ) : (
                                                    'None'
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='pokemon_info_container'>
                                <h3 className='pokemon_info_container_title'>Forms</h3>
                                <table className='pokemon_info_container_table'>
                                    <tbody>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Alternative forms
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                    {species?.forms_switchable === true ? (
                                                        'Yes'
                                                    ) : (
                                                        'No'
                                                    )}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Varieties
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                {species?.varieties?.map((sv) => 
                                                    <p>
                                                        {sv?.pokemon?.name?.replace(/-/g, ' ')}
                                                        {sv?.is_default === true &&
                                                            <>
                                                                ‌‌ (default)
                                                            </>
                                                        }
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_info_container_table_row'>
                                            <th className='pokemon_info_container_table_row_head'>
                                                Gender differences
                                            </th>
                                            <td className='pokemon_info_container_table_row_element'>
                                                    {species?.has_gender_differences === true ? (
                                                        'Yes'
                                                    ) : (
                                                        'No'
                                                    )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className='pokemon_stats'>
                            <div className='pokemon_stats_container'>
                                <h3 className='pokemon_stats_container_title'>Base stats</h3>
                                <table className='pokemon_stats_container_table'>
                                    <tbody>
                                        <tr className='pokemon_stats_container_table_row'>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[0]?.stat?.name.toUpperCase()}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[0]?.base_stat}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_progress'>
                                                <div className='pokemon_stats_container_table_row_progress_inner'>
                                                    <span style={{"width":`calc(${pokemon?.stats?.[0]?.base_stat} / 180 * 100%)`}}></span>
                                                </div>
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[0]?.base_stat * 2 + 110}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[0]?.base_stat * 2 + 204}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_stats_container_table_row'>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[1]?.stat?.name}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[1]?.base_stat}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_progress'>
                                                <div className='pokemon_stats_container_table_row_progress_inner'>
                                                    <span style={{"width":`calc(${pokemon?.stats?.[1]?.base_stat} / 180 * 100%)`}}></span>
                                                </div>
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {Math.floor((((2 * pokemon?.stats?.[1]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {Math.floor((pokemon?.stats?.[1]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_stats_container_table_row'>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[2]?.stat?.name}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[2]?.base_stat}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_progress'>
                                                <div className='pokemon_stats_container_table_row_progress_inner'>
                                                    <span style={{"width":`calc(${pokemon?.stats?.[2]?.base_stat} / 180 * 100%)`}}></span>
                                                </div>
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {Math.floor((((2 * pokemon?.stats?.[2]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {Math.floor((pokemon?.stats?.[2]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_stats_container_table_row'>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[3]?.stat?.name.replace(/-/g, ' ')}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[3]?.base_stat}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_progress'>
                                                <div className='pokemon_stats_container_table_row_progress_inner'>
                                                    <span style={{"width":`calc(${pokemon?.stats?.[3]?.base_stat} / 180 * 100%)`}}></span>
                                                </div>
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {Math.floor((((2 * pokemon?.stats?.[3]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {Math.floor((pokemon?.stats?.[3]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_stats_container_table_row'>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[4]?.stat?.name.replace(/-/g, ' ')}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[4]?.base_stat}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_progress'>
                                                <div className='pokemon_stats_container_table_row_progress_inner'>
                                                    <span style={{"width":`calc(${pokemon?.stats?.[4]?.base_stat} / 180 * 100%)`}}></span>
                                                </div>
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {Math.floor((((2 * pokemon?.stats?.[4]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {Math.floor((pokemon?.stats?.[4]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_stats_container_table_row'>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[5]?.stat?.name}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {pokemon?.stats?.[5]?.base_stat}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_progress'>
                                                <div className='pokemon_stats_container_table_row_progress_inner'>
                                                    <span style={{"width":`calc(${pokemon?.stats?.[5]?.base_stat} / 180 * 100%)`}}></span>
                                                </div>
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                                {Math.floor((((2 * pokemon?.stats?.[5]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_element'>
                                            {Math.floor((pokemon?.stats?.[5]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                                            </td>
                                        </tr>
                                        <tr className='pokemon_stats_container_table_row'>
                                            <td className='pokemon_stats_container_table_row_total'>
                                                Total
                                            </td>
                                            <td className='pokemon_stats_container_table_row_total'>
                                                {pokemon?.stats?.[0]?.base_stat + pokemon?.stats?.[1]?.base_stat + pokemon?.stats?.[2]?.base_stat + pokemon?.stats?.[3]?.base_stat + pokemon?.stats?.[4]?.base_stat + pokemon?.stats?.[5]?.base_stat}
                                            </td>
                                            <td className='pokemon_stats_container_table_row_progress'>
                                                <div className='pokemon_stats_container_table_row_progress_inner'>
                                                    <span style={{"width":`calc(${pokemon?.stats?.[5]?.base_stat} / 180 * 100%)`}}></span>
                                                </div>
                                            </td>
                                            <td className='pokemon_stats_container_table_row_total'>
                                                Min.
                                            </td>
                                            <td className='pokemon_stats_container_table_row_total'>
                                                Max.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='pokemon_stats_types'>
                                <h3 className='pokemon_stats_types_title'>Types relations</h3>
                            </div>
                        </section>

                        <nav className='pokemon_method'>
                            <button className={toggleState === 1 ? 'pokemon_method_active' : 'pokemon_method_element'} onClick={() => toggleTable(1)}><span>Level Up</span></button>
                            <button className={toggleState === 2 ? 'pokemon_method_active' : 'pokemon_method_element'} onClick={() => toggleTable(2)}><span>TM /HM</span></button>
                            <button className={toggleState === 3 ? 'pokemon_method_active' : 'pokemon_method_element'} onClick={() => toggleTable(3)}><span>Tutor</span></button>
                            <button className={toggleState === 4 ? 'pokemon_method_active' : 'pokemon_method_element'} onClick={() => toggleTable(4)}><span>Breeding</span></button>
                            <button className={toggleState === 5 ? 'pokemon_method_active' : 'pokemon_method_element'} onClick={() => toggleTable(5)}><span>Evolving</span></button>
                        </nav>

                        <button className='back_button' onClick={() => navigate("/")}> ᐸ Back to pokemon</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default PokemonCard;