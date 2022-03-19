import React from 'react';
import { Link } from 'react-router-dom';

function Training({pokemon, species}) {
    return (
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
                                    <Link
                                        to={`/items/${ph.item.name}`}
                                    >
                                        {ph?.item?.name?.replace(/-/g, ' ')}
                                    </Link>
                                )
                            ) : (
                                'None'
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Training