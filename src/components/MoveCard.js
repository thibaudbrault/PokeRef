import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

    console.log(move);

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
                            <table className='move_table'>
                                <tbody>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Type</th>
                                        <td className='move_table_row_element'>
                                            <div className='move_table_row_element_type' id={move?.type?.name}>
                                                <img alt={move?.type?.name} />
                                                <span>{move?.type?.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Category</th>
                                        <td className='move_table_row_element'>
                                            <div className='move_table_row_element_category' id={move?.damage_class?.name}>
                                                <img alt={move?.damage_class?.name} />
                                                <span>{move?.damage_class?.name}</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Power</th>
                                        <td className='move_table_row_element'>{move?.power}</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>PP</th>
                                        <td className='move_table_row_element'>{move?.pp} (max. {maxPp})</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Accuracy</th>
                                        <td className='move_table_row_element'>{move?.accuracy}</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Status</th>
                                        <td className='move_table_row_element'>{move?.meta?.ailment?.name?.replace('none', '-')}</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Priority</th>
                                        <td className='move_table_row_element'>{move?.priority}</td>
                                    </tr>
                                    <tr className='move_table_row'>
                                        <th className='move_table_row_head'>Introduced</th>
                                        <td className='move_table_row_generation'>{move?.generation?.name.replace(/-/g, ' ')}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <ul className='move_effect'>
                                <li className='move_effect_container'>
                                    <h3 className='move_effect_title'>Effects</h3>
                                    <p className='move_effect_text'>
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
                                    <ul className='move_effect_meta'>
                                        {move?.meta?.ailment?.name !== 'none' && 
                                        <li className='move_effect_meta_element'>Status : {move?.meta?.ailment?.name}</li>}
                                        {move?.meta?.ailment_chance !== 0 && 
                                        <li className='move_effect_meta_element'>Has a {move?.meta?.ailment_chance}% chance to {move?.meta?.ailment?.name} the target</li>}
                                        {move?.meta?.crit_rate !== 0 && 
                                        <li className='move_effect_meta_element'>Increase the chance of landing a critical hit by {move?.meta?.crit_rate} stage</li>}
                                        {move?.meta?.drain !== 0 && 
                                        <li className='move_effect_meta_element'>Drains {move?.meta?.drain}% of the damage inflicted to heal the user</li>}
                                        {move?.meta?.flinch_chance !== 0 && 
                                        <li className='move_effect_meta_element'>Has a {move?.meta?.flinch_chance}% of causing the target to flinch</li>}
                                        {move?.meta?.healing !== 0 && 
                                        <li className='move_effect_meta_element'>Recovers {move?.meta?.flinch_chance}% of the user's maximum HP</li>}
                                        {move?.meta?.min_hits !== null && 
                                        <li className='move_effect_meta_element'>This move hits between {move?.meta?.min_hits} and {move?.meta?.max_hits} times</li>}
                                        {move?.meta?.min_turns !== null && 
                                        <li className='move_effect_meta_element'>This move last between {move?.meta?.min_turns} and {move?.meta?.max_turns} turns</li>}
                                    </ul>
                                </li>
                                <li className='move_effect_container'>
                                    {move?.stat_changes?.length > 0 ? (
                                        <>
                                            <h4 className='move_effect_subtitle'>Stat modification</h4>
                                            <ul className='move_effect_stat'>
                                                {move?.stat_changes?.map((ms) => 
                                                    ms?.change < 0 ? (
                                                        <li className='move_effect_stat_element'>This move lower the target's <span>{ms?.stat?.name}</span> by {ms?.change} stage</li>
                                                    ) : (
                                                        <li className='move_effect_stat_element'>This move raises the target's <span>{ms?.stat?.name}</span> by {ms?.change} stage</li>
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
                                            <h4 className='move_effect_subtitle'>Changes</h4>
                                            <ul className='move_effect_changes'>
                                                    {move?.past_values?.map((mp) => 
                                                        <>
                                                            {mp?.power !== null && 
                                                            <li className='move_effect_changes_element'>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : {move?.name.toUpperCase()} had {mp?.power} base power</li>}
                                                            {mp?.accuracy !== null && 
                                                            <li className='move_effect_changes_element'>Before <span>{mp?.version_group?.name.replace(/-/g, ' ')}</span> : {move?.name.toUpperCase()} had {mp?.accuracy} accuracy</li>}
                                                            {mp?.pp !== null && 
                                                            <li className='move_effect_changes_element'>Before <span>{mp?.version_group?.name.replace(/-/g, ' ')}</span> : {move?.name.toUpperCase()} had {mp?.pp} accuracy</li>}
                                                            {mp?.type !== null && 
                                                            <li className='move_effect_changes_element'>Before <span>{mp?.version_group?.name.replace(/-/g, ' ')}</span> : {move?.name.toUpperCase()} had {mp?.type} accuracy</li>}
                                                            
                                                        </>
                                                    )}
                                            </ul>
                                        </>
                                    ) : (
                                        null
                                    )}
                                </li>
                                <li className='move_effect_container'>
                                    <h4 className='move_effect_subtitle'>Target</h4>
                                    <p className='move_effect_target'>{move?.target?.name.replace(/-/g, ' ')}</p>
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
                        <button className='move_button' onClick={() => navigate("/moves")}> ᐸ Back to moves</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default MoveCard;