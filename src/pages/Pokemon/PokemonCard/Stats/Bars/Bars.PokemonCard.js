import React from 'react';
import { H3 } from '../../../../../components/BaseStyles/Headings';
import { PokemonStatsBars, PokemonStatsText, PokemonStatsTotal } from '../StyledStats.PokemonCard';


function Bars({pokemon}) {
    return (
        <div>
            <H3>Base stats</H3>
            <table>
                <tbody>
                    <tr>
                        <PokemonStatsText>
                            {pokemon?.stats?.[0]?.stat?.name.toUpperCase()}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {pokemon?.stats?.[0]?.base_stat}
                        </PokemonStatsText>
                        <PokemonStatsBars>
                            <div>
                                <span style={{"width":`calc(${pokemon?.stats?.[0]?.base_stat} / 180 * 100%)`}}></span>
                            </div>
                        </PokemonStatsBars>
                        <PokemonStatsText>
                            {pokemon?.stats?.[0]?.base_stat * 2 + 110}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {pokemon?.stats?.[0]?.base_stat * 2 + 204}
                        </PokemonStatsText>
                    </tr>
                    <tr>
                        <PokemonStatsText>
                            {pokemon?.stats?.[1]?.stat?.name}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {pokemon?.stats?.[1]?.base_stat}
                        </PokemonStatsText>
                        <PokemonStatsBars>
                            <div>
                                <span style={{"width":`calc(${pokemon?.stats?.[1]?.base_stat} / 180 * 100%)`}}></span>
                            </div>
                        </PokemonStatsBars>
                        <PokemonStatsText>
                            {Math.floor((((2 * pokemon?.stats?.[1]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {Math.floor((pokemon?.stats?.[1]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                        </PokemonStatsText>
                    </tr>
                    <tr>
                        <PokemonStatsText>
                            {pokemon?.stats?.[2]?.stat?.name}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {pokemon?.stats?.[2]?.base_stat}
                        </PokemonStatsText>
                        <PokemonStatsBars>
                            <div>
                                <span style={{"width":`calc(${pokemon?.stats?.[2]?.base_stat} / 180 * 100%)`}}></span>
                            </div>
                        </PokemonStatsBars>
                        <PokemonStatsText>
                            {Math.floor((((2 * pokemon?.stats?.[2]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {Math.floor((pokemon?.stats?.[2]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                        </PokemonStatsText>
                    </tr>
                    <tr>
                        <PokemonStatsText>
                            {pokemon?.stats?.[3]?.stat?.name.replace(/-/g, ' ')}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {pokemon?.stats?.[3]?.base_stat}
                        </PokemonStatsText>
                        <PokemonStatsBars>
                            <div>
                                <span style={{"width":`calc(${pokemon?.stats?.[3]?.base_stat} / 180 * 100%)`}}></span>
                            </div>
                        </PokemonStatsBars>
                        <PokemonStatsText>
                            {Math.floor((((2 * pokemon?.stats?.[3]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {Math.floor((pokemon?.stats?.[3]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                        </PokemonStatsText>
                    </tr>
                    <tr>
                        <PokemonStatsText>
                            {pokemon?.stats?.[4]?.stat?.name.replace(/-/g, ' ')}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {pokemon?.stats?.[4]?.base_stat}
                        </PokemonStatsText>
                        <PokemonStatsBars>
                            <div>
                                <span style={{"width":`calc(${pokemon?.stats?.[4]?.base_stat} / 180 * 100%)`}}></span>
                            </div>
                        </PokemonStatsBars>
                        <PokemonStatsText>
                            {Math.floor((((2 * pokemon?.stats?.[4]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {Math.floor((pokemon?.stats?.[4]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                        </PokemonStatsText>
                    </tr>
                    <tr>
                        <PokemonStatsText>
                            {pokemon?.stats?.[5]?.stat?.name}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {pokemon?.stats?.[5]?.base_stat}
                        </PokemonStatsText>
                        <PokemonStatsBars>
                            <div>
                                <span style={{"width":`calc(${pokemon?.stats?.[5]?.base_stat} / 180 * 100%)`}}></span>
                            </div>
                        </PokemonStatsBars>
                        <PokemonStatsText>
                            {Math.floor((((2 * pokemon?.stats?.[5]?.base_stat + 0 + 0 / 4) * 100) / 100 + 5) * 0.9).toFixed(0)}
                        </PokemonStatsText>
                        <PokemonStatsText>
                            {Math.floor((pokemon?.stats?.[5]?.base_stat * 2 + 99) * 1.1).toFixed(0)}
                        </PokemonStatsText>
                    </tr>
                    <tr>
                        <PokemonStatsTotal>
                            Total
                        </PokemonStatsTotal>
                        <PokemonStatsTotal>
                            {pokemon?.stats?.[0]?.base_stat + pokemon?.stats?.[1]?.base_stat + pokemon?.stats?.[2]?.base_stat + pokemon?.stats?.[3]?.base_stat + pokemon?.stats?.[4]?.base_stat + pokemon?.stats?.[5]?.base_stat}
                        </PokemonStatsTotal>
                        <PokemonStatsBars>
                            <div>
                                <span style={{"width":`calc(${pokemon?.stats?.[5]?.base_stat} / 180 * 100%)`}}></span>
                            </div>
                        </PokemonStatsBars>
                        <PokemonStatsTotal>
                            Min.
                        </PokemonStatsTotal>
                        <PokemonStatsTotal>
                            Max.
                        </PokemonStatsTotal>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Bars