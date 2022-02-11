import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const MoveCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [move, setMove] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/move/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setMove(results);
        });
    }, [name]);

    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        setLoading(true);
        axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=898')
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

    console.log(move)

    const maxPp = move?.pp * '1.6';

    return (
        <>
            <Header />
            <Nav />
            <main className='move'>
                {loading ? (
                <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <h2 className='move_title'>{move?.name?.replace(/-/g, ' ') ?? ""}</h2>
                        <section className='move_data'>
                            <table className='move_data_table'>
                                <tbody>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Type</th>
                                        <td className='move_data_table_row_element'>
                                            <div className='move_data_table_row_element_type' id={move?.type?.name}>
                                                <img alt={move?.type?.name} />
                                                <span>{move?.type?.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Category</th>
                                        <td className='move_data_table_row_element'>
                                            <div className='move_data_table_row_element_category' id={move?.damage_class?.name}>
                                                <img alt={move?.damage_class?.name} />
                                                <span>{move?.damage_class?.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Power</th>
                                        <td className='move_data_table_row_element'>{move?.power}</td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>PP</th>
                                        <td className='move_data_table_row_element'>{move?.pp} (max. {maxPp})</td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Accuracy</th>
                                        <td className='move_data_table_row_element'>{move?.accuracy}</td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Status</th>
                                        <td className='move_data_table_row_element'>{move?.meta?.ailment?.name?.replace('none', '-')}</td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Priority</th>
                                        <td className='move_data_table_row_element'>{move?.priority}</td>
                                    </tr>
                                    <tr className='move_data_table_row'>
                                        <th className='move_data_table_row_head'>Introduced</th>
                                        <td className='move_data_table_row_generation'>{move?.generation?.name.replace(/-/g, ' ')}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <ul className='move_effect'>
                                <li className='move_effect_container'>
                                    <h3 className='move_effect_container_title'>Effects</h3>
                                    <p className='move_effect_container_text'>
                                        <span>{move?.name?.replace(/-/g, ' ').toUpperCase()} </span>
                                        {move?.effect_entries?.map((me) => 
                                            me.language.name === 'en'  ? (
                                                <>
                                                    {me.effect}
                                                </>
                                            ) : (
                                                null
                                            )
                                        )}
                                    </p>
                                    <ul className='move_effect_container_meta'>
                                        {move?.meta?.ailment?.name !== 'none' && 
                                        <li className='move_effect_container_meta_element'>Status : {move?.meta?.ailment?.name}</li>}
                                        {move?.meta?.ailment_chance !== 0 && 
                                        <li className='move_effect_container_meta_element'>Has a {move?.meta?.ailment_chance}% chance to {move?.meta?.ailment?.name} the target</li>}
                                        {move?.meta?.crit_rate !== 0 && 
                                        <li className='move_effect_container_meta_element'>Increase the chance of landing a critical hit by {move?.meta?.crit_rate} stage</li>}
                                        {move?.meta?.drain !== 0 && 
                                        <li className='move_effect_container_meta_element'>Drains {move?.meta?.drain}% of the damage inflicted to heal the user</li>}
                                        {move?.meta?.flinch_chance !== 0 && 
                                        <li className='move_effect_container_meta_element'>Has a {move?.meta?.flinch_chance}% of causing the target to flinch</li>}
                                        {move?.meta?.healing !== 0 && 
                                        <li className='move_effect_container_meta_element'>Recovers {move?.meta?.flinch_chance}% of the user's maximum HP</li>}
                                        {move?.meta?.min_hits !== null && 
                                        <li className='move_effect_container_meta_element'>This move hits between {move?.meta?.min_hits} and {move?.meta?.max_hits} times</li>}
                                        {move?.meta?.min_turns !== null && 
                                        <li className='move_effect_container_meta_element'>This move last between {move?.meta?.min_turns} and {move?.meta?.max_turns} turns</li>}
                                    </ul>
                                </li>
                                <li className='move_effect_container'>
                                    {move?.stat_changes?.length > 0 ? (
                                        <>
                                            <h4 className='move_effect_container_subtitle'>Stat modification</h4>
                                            <ul className='move_effect_container_stat'>
                                                {move?.stat_changes?.map((ms) => 
                                                    ms?.change < 0 ? (
                                                        <li className='move_effect_container_stat_element'>This move lower the target's <span>{ms?.stat?.name?.replace(/-/g, ' ')}</span> by {ms?.change} stage</li>
                                                    ) : (
                                                        <li className='move_effect_container_stat_element'>This move raises the target's <span>{ms?.stat?.name}</span> by {ms?.change} stage</li>
                                                    )
                                                )}
                                            </ul>
                                        </>
                                    ) : (
                                        null
                                    )
                                    }
                                </li>
                                <li className='move_effect_container'>
                                    {move?.past_values?.length > 0 ? (
                                        <>
                                            <h4 className='move_effect_container_subtitle'>Changes</h4>
                                            <ul className='move_effect_container_changes'>
                                                    {move?.past_values?.map((mp) => 
                                                        <>
                                                            {mp?.power !== null && 
                                                            <li className='move_effect_container_changes_element'>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : {move?.name?.replace(/-/g, ' ')?.toUpperCase()} had {mp?.power} base power</li>}
                                                            {mp?.accuracy !== null && 
                                                            <li className='move_effect_container_changes_element'>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : {move?.name?.replace(/-/g, ' ')?.toUpperCase()} had {mp?.accuracy} accuracy</li>}
                                                            {mp?.pp !== null && 
                                                            <li className='move_effect_container_changes_element'>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : {move?.name?.replace(/-/g, ' ')?.toUpperCase()} had {mp?.pp} PP</li>}
                                                            {mp?.type !== null && 
                                                            <li className='move_effect_container_changes_element'>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : {move?.name?.replace(/-/g, ' ')?.toUpperCase()} was {mp?.type} type</li>}
                                                            
                                                        </>
                                                    )}
                                            </ul>
                                        </>
                                    ) : (
                                        null
                                    )}
                                </li>
                                <li className='move_effect_container'>
                                    <h4 className='move_effect_container_subtitle'>Target</h4>
                                    <p className='move_effect_container_target'>{move?.target?.name.replace(/-/g, ' ')}</p>
                                </li>
                            </ul>
                        </section>

                        <section className='move_desc'>
                            <div className='move_desc_container'>
                                <h3 className='move_desc_title'>Game descriptions</h3>
                                <table className='move_desc_table'>
                                    <tbody>
                                        {move?.flavor_text_entries?.map((mf) => 
                                            mf?.language?.name === 'en' ? (
                                                <tr className='move_desc_table_row'>
                                                    <th className='move_desc_table_row_head'>{mf?.version_group?.name?.replace(/-/g, ' ')}</th>
                                                    <td className='move_desc_table_row_element'>{mf?.flavor_text}</td>
                                                </tr>
                                            ) : (
                                                ''
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className='move_learn'>
                            <h3 className='move_learn_title'>Learned by level up</h3>
                            <p className='move_learn_txt'>Learned when the pokémon reach a ceratin level. Data from Pokémon Ultra Sun & Ultra Moon. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                    {pokemon?.map((p) => 
                                        p?.moves?.map((pm) => 
                                            pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                            pmv?.version_group?.name === 'ultra-sun-ultra-moon' && pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at > 1 &&
                                                <li className='move_learn_list_element'>
                                                    <img src={p?.sprites?.front_default} alt={p?.name} />
                                                    <Link
                                                    to={`/pokemon/${p?.name}`}
                                                    key={p?.name}
                                                    className='move_learn_list_element_name'>
                                                        {p?.name.replace(/-/g, ' ')}
                                                    </Link>
                                                    <p className='move_learn_list_element_lvl'>Level {pmv?.level_learned_at}</p>
                                                    <div className='move_learn_list_element_types'>
                                                        {p?.types?.map((pt) =>
                                                            <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                                <img alt={pt?.type?.name} />
                                                                <span>{pt?.type?.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </li>
                                            )
                                        )
                                    )}
                            </ul>
                        </section>

                        <section className='move_learn'>
                            <h3 className='move_learn_title'>Learned by TM</h3>
                            <p className='move_learn_txt'>Learned by using a TM. Data from Pokémon Ultra Sun & Ultra Moon. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                {pokemon?.map((p) => 
                                    p?.moves?.map((pm) => 
                                        pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                        pmv?.version_group?.name === 'ultra-sun-ultra-moon' && pmv?.move_learn_method?.name === 'machine' && pmv?.level_learned_at === 0 &&
                                            <li className='move_learn_list_element'>
                                                <img src={p?.sprites?.front_default} alt={p?.name} />
                                                <Link
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                                className='move_learn_list_element_name'>
                                                    {p?.name.replace(/-/g, ' ')}
                                                </Link>
                                                <div className='move_learn_list_element_types'>
                                                    {p?.types?.map((pt) =>
                                                        <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                            <img alt={pt?.type?.name} />
                                                            <span>{pt?.type?.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        </section>

                        <section className='move_learn'>
                            <h3 className='move_learn_title'>Learned from the Move Relearner / by breeding</h3>
                            <p className='move_learn_txt'>Learned at level 1 which means that the only way to learn this move is via the move relearner or through breeeding. Data from Pokémon Ultra Sun & Ultra Moon. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                {pokemon?.map((p) => 
                                    p?.moves?.map((pm) => 
                                        pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                        pmv?.version_group?.name === 'ultra-sun-ultra-moon' && pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at === 1 &&
                                            <li className='move_learn_list_element'>
                                                <img src={p?.sprites?.front_default} alt={p?.name} />
                                                <Link
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                                className='move_learn_list_element_name'>
                                                    {p?.name.replace(/-/g, ' ')}
                                                </Link>
                                                <div className='move_learn_list_element_types'>
                                                    {p?.types?.map((pt) =>
                                                        <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                            <img alt={pt?.type?.name} />
                                                            <span>{pt?.type?.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        </section>

                        <section className='move_learn'>
                            <h3 className='move_learn_title'>Learned when evolving</h3>
                            <p className='move_learn_txt'>Learned when the pokémon is evolving no matter its level. Data from Pokémon Ultra Sun & Ultra Moon. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                {pokemon?.map((p) => 
                                    p?.moves?.map((pm) => 
                                        pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                        pmv?.version_group?.name === 'ultra-sun-ultra-moon' && pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at === 0 && 
                                            <li className='move_learn_list_element'>
                                                <img src={p?.sprites?.front_default} alt={p?.name} />
                                                <Link
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                                className='move_learn_list_element_name'>
                                                    {p?.name.replace(/-/g, ' ')}
                                                </Link>
                                                <div className='move_learn_list_element_types'>
                                                    {p?.types?.map((pt) =>
                                                        <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                            <img alt={pt?.type?.name} />
                                                            <span>{pt?.type?.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        </section>

                        <section className='move_learn'>
                            <h3 className='move_learn_title'>Learned by move tutor</h3>
                            <p className='move_learn_txt'>Learned by going to the move tutor. Data from Pokémon Ultra Sun & Ultra Moon. These informations may vary in other games. Check the respective pokédex pages for details.</p>
                            <ul className='move_learn_list'>
                                {pokemon?.map((p) => 
                                    p?.moves?.map((pm) => 
                                        pm?.move?.name === move?.name && pm?.version_group_details?.map((pmv) =>
                                        pmv?.version_group?.name === 'ultra-sun-ultra-moon' && pmv?.move_learn_method?.name === 'tutor' &&
                                            <li className='move_learn_list_element'>
                                                <img src={p?.sprites?.front_default} alt={p?.name} />
                                                <Link
                                                to={`/pokemon/${p?.name}`}
                                                key={p?.name}
                                                className='move_learn_list_element_name'>
                                                    {p?.name.replace(/-/g, ' ')}
                                                </Link>
                                                <div className='move_learn_list_element_types'>
                                                    {p?.types?.map((pt) =>
                                                        <div id={pt.type.name} className='move_learn_list_element_types_element'>
                                                            <img alt={pt?.type?.name} />
                                                            <span>{pt?.type?.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        )
                                    )
                                )}
                            </ul>
                        </section>

                        <button className='move_button' onClick={() => navigate("/moves")}> ᐸ Back to moves</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default MoveCard;