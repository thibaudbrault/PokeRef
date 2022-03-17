import React from 'react';
import { Link } from 'react-router-dom';
import { pokemon, species, location, game} from '../../PokemonCard';

function Table() {

    const height = (pokemon?.height * 0.1).toFixed(2);
    const weight = (pokemon?.weight * 0.1).toFixed(2);

    return (
        <table className='pokemon_data_container_table'>
            <tbody className='pokemon_data_container_table_body'>
                <tr className='pokemon_data_container_table_body_row'>
                    <th className='pokemon_data_container_table_body_row_head'>
                        National number
                    </th>
                    <td className='pokemon_data_container_table_body_row_element'>
                        {pokemon?.id > 10000 ? (
                            `# ${species?.id?.toString()?.padStart(3, '0')}`
                        ) : (
                            `# ${pokemon?.id?.toString()?.padStart(3, '0')}`
                        )}
                    </td>
                </tr>
                <tr className='pokemon_data_container_table_body_row'>
                    <th className='pokemon_data_container_table_body_row_head'>
                        Locations
                    </th>
                    <td className='pokemon_data_container_table_body_row_element'>
                        {location.length !== 0 ? (
                            location?.map((l) => 
                                l?.version_details?.map((lv) =>
                                    lv?.version?.name === game &&
                                        <p>
                                            {l?.location_area?.name?.replace(/-/g, ' ')}
                                        </p>
                                )
                            )
                        ) : (
                            'Not found in the wild'
                        )}
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
    )
}

export default Table