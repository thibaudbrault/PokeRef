import React from 'react';
import { Link } from 'react-router-dom';

function Forms({species}) {
    return (
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
                                <Link
                                to={`/pokemon/${sv?.pokemon?.name}`}
                                key={sv?.pokemon?.name}
                                >
                                    {sv?.pokemon?.name?.replace(/-/g, ' ')}
                                    {sv?.is_default === true &&
                                        <>
                                            ‌‌ (default)
                                        </>
                                    }
                                </Link>
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
    )
}

export default Forms