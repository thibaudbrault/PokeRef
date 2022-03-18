import React from 'react'

function Breeding({species, evolution}) {

    const female = species?.gender_rate / 8 * 100;
    const male = '100' - (species?.gender_rate / 8 * 100);

    return (
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
                                    {male}% male
                                    <br />
                                    {female}% female
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
                                {species?.hatch_counter} cycles
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
    )
}

export default Breeding