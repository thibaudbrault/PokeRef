import React from 'react'

function Bars({pokemon}) {
    return (
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
    )
}

export default Bars