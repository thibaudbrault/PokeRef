import React from 'react';
import { Link } from 'react-router-dom';

function Egg({toggleState, pokemon, move, version}) {
    return (
        <table className={toggleState === 3 ? "active pokemon_moves_table" : "hidden"}>
            <thead className='pokemon_moves_table_head'>
                <tr className='pokemon_moves_table_head_row'>
                    <th className='pokemon_moves_table_head_row_element'>
                        Name
                    </th>
                    <th className='pokemon_moves_table_head_row_element'>
                        Type
                    </th>
                    <th className='pokemon_moves_table_head_row_element'>
                        Category
                    </th>
                    <th className='pokemon_moves_table_head_row_element'>
                        Power
                    </th>
                    <th className='pokemon_moves_table_head_row_element'>
                        PP
                    </th>
                    <th className='pokemon_moves_table_head_row_element'>
                        Accuracy
                    </th>
                    <th className='pokemon_moves_table_head_row_element'>
                        Priority
                    </th>
                    <th className='pokemon_moves_table_head_row_element'>
                        Status
                    </th>
                </tr>
            </thead>
            <tbody className='pokemon_moves_table_body'>
                {pokemon?.moves?.map((pm) => 
                    pm?.version_group_details?.map((pmv) =>
                    pmv?.version_group?.name === version && ((pmv?.move_learn_method?.name === 'egg') || (pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at === 1)) &&
                        <tr className='pokemon_moves_table_body_row'>
                            <td className='pokemon_moves_table_body_row_element'>
                                <Link
                                    to={`/moves/${pm?.move?.name}`}
                                >
                                    {pm?.move?.name.replace(/-/g, ' ')}
                                </Link>
                            </td>
                            {move?.map((m) =>
                                m?.name === pm?.move?.name &&
                                    <td className='pokemon_moves_table_body_row_element' id={m?.type?.name} style={{"background":"transparent"}}>
                                        <img alt={m?.type?.name} />
                                    </td>
                            )}
                            {move?.map((m) =>
                                m?.name === pm?.move?.name &&
                                    <td className='pokemon_moves_table_body_row_element'>
                                        {m?.damage_class?.name}
                                    </td>
                            )}
                            {move?.map((m) =>
                                m?.name === pm?.move?.name &&
                                    <td className='pokemon_moves_table_body_row_element'>
                                        {m?.power !== null ? (
                                            m?.power
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                            )}
                            {move?.map((m) =>
                                m?.name === pm?.move?.name &&
                                    <td className='pokemon_moves_table_body_row_element'>
                                        {m?.pp}
                                    </td>
                            )}
                            {move?.map((m) =>
                                m?.name === pm?.move?.name &&
                                    <td className='pokemon_moves_table_body_row_element'>
                                        {m?.accuracy !== null ? (
                                            m?.accuracy
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                            )}
                            {move?.map((m) =>
                                m?.name === pm?.move?.name &&
                                    <td className='pokemon_moves_table_body_row_element'>
                                        {m?.priority}
                                    </td>
                            )}
                            {move?.map((m) =>
                                m?.name === pm?.move?.name &&
                                    <td className='pokemon_moves_table_body_row_element'>
                                        {m?.meta?.ailment !== null ? (
                                            m?.meta?.ailment?.name?.replace('none', '-')
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                            )}
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}

export default Egg