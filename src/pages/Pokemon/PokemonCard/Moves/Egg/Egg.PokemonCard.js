import React from 'react';
import { THead, TLink, TRow } from '../../../../../components/BaseStyles/Table';
import { PokemonMovesTd, PokemonMovesEmpty, PokemonMovesTable } from '../StyledMoves.PokemonCard';

function Egg({toggleState, pokemon, move, version, game}) {
    return (
        <PokemonMovesTable visibility={toggleState === 3}>
            <THead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Type
                    </th>
                    <th>
                        Category
                    </th>
                    <th>
                        Power
                    </th>
                    <th>
                        PP
                    </th>
                    <th>
                        Accuracy
                    </th>
                    <th>
                        Priority
                    </th>
                    <th>
                        Status
                    </th>
                </tr>
            </THead>
            <tbody>
                <>
                    {!pokemon?.moves?.map((pm) => 
                        pm?.version_group_details?.map((pmv) =>
                        pmv?.version_group?.name === version && ((pmv?.move_learn_method?.name === 'egg') || (pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at === 1)) &&
                            <PokemonMovesEmpty>
                                <span>{pokemon?.name?.replace(/-/g, ' ')}</span> ‌‌ doesn't learn any moves this way in Pokémon ‌‌ <span>{game}</span>
                            </PokemonMovesEmpty>
                    ))}
                    {pokemon?.moves?.map((pm) => 
                        pm?.version_group_details?.map((pmv) =>
                        pmv?.version_group?.name === version && ((pmv?.move_learn_method?.name === 'egg') || (pmv?.move_learn_method?.name === 'level-up' && pmv?.level_learned_at === 1)) &&
                        <TRow>
                            <td>
                                <TLink
                                    to={`/moves/${pm?.move?.name}`}
                                >
                                    {pm?.move?.name.replace(/-/g, ' ')}
                                </TLink>
                            </td>
                            {move?.map((m) =>
                                m?.name === pm?.move?.name &&
                                    <>
                                        <PokemonMovesTd id={m?.type?.name} style={{"background":"transparent"}}>
                                            <img alt={m?.type?.name} width={32} height={32} />
                                        </PokemonMovesTd>
                                        <PokemonMovesTd>
                                            {m?.damage_class?.name}
                                        </PokemonMovesTd>
                                        <PokemonMovesTd>
                                            {m?.power !== null ? (
                                                m?.power
                                            ) : (
                                                '-'
                                            )}
                                        </PokemonMovesTd>
                                        <PokemonMovesTd>
                                            {m?.pp}
                                        </PokemonMovesTd>
                                        <PokemonMovesTd>
                                            {m?.accuracy !== null ? (
                                                m?.accuracy
                                            ) : (
                                                '-'
                                            )}
                                        </PokemonMovesTd>
                                        <PokemonMovesTd>
                                            {m?.priority}
                                        </PokemonMovesTd>
                                        <PokemonMovesTd>
                                            {m?.meta?.ailment !== null ? (
                                                m?.meta?.ailment?.name?.replace('none', '-')
                                            ) : (
                                                '-'
                                            )}
                                        </PokemonMovesTd>
                                    </>
                            )}
                        </TRow>
                    ))}
                </>
            </tbody>
        </PokemonMovesTable>
    )
}

export default Egg