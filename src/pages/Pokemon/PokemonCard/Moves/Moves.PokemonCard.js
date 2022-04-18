import React, { useState, useEffect } from 'react';
import Method from '../../../../components/Method/Method';

import { PokemonMovesSection, PokemonMovesTd, PokemonMovesEmpty, PokemonMovesMachine } from './StyledMoves.PokemonCard';
import { Table, THead, TRow, TLink } from '../../../../components/BaseStyles/Table';
import { H3 } from '../../../../components/BaseStyles/Headings';
import { DamageClass } from '../../../../components/BaseStyles/Themes';

function Moves({toggleState, toggleTable, pokemon, move, machine, version, game}) {

    const [learn, setLearn] = useState();

    useEffect(() => {
        if (toggleState === 1) {
            setLearn('level-up')
        } else if (toggleState === 2) {
            setLearn('machine')
        } else if (toggleState === 3) {
            setLearn('egg')
        } else if (toggleState === 4) {
            setLearn('tutor')
        } 
    }, [toggleState])

    const isLearnedMoveForVersion = (version) => (pmv) => 
        pmv?.version_group?.name === version && 
        pmv?.move_learn_method?.name === learn;

    const isLearnedMove = isLearnedMoveForVersion(version);

    const emptyMoves = (
        <PokemonMovesEmpty>
            <span>{pokemon?.name?.replace(/-/g, " ")}</span> ‌‌ doesn't learn
            any moves this way in Pokémon ‌‌ <span>{game}</span>
        </PokemonMovesEmpty>
    );

    const moveInfoTable = (pm) =>
        move?.map((m) =>
            m?.name === pm?.move?.name && (
                <>
                    <DamageClass id={m?.type?.name} style={{"background":"transparent"}}>
                        <img alt={m?.type?.name} width={32} height={32} />
                    </DamageClass>
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
            )
        );

    const dataMoves = pokemon?.moves?.map((pm) =>
        pm?.version_group_details?.map(
        (pmv) => isLearnedMove(pmv) && (
            <TRow>
                {learn === 'level-up' && (
                    <PokemonMovesTd>
                        {pmv?.level_learned_at}
                    </PokemonMovesTd>
                )}
                {learn === 'machine' && (
                    machine?.map((ma) =>
                        ma?.move?.name === pm?.move?.name && ma?.version_group?.name === version &&
                            <PokemonMovesMachine>
                                {ma?.item?.name}
                            </PokemonMovesMachine>
                    )
                )}
                {learn === 'egg' && (
                    <PokemonMovesTd>
                        -
                    </PokemonMovesTd>
                )}
                {learn === 'tutor' && (
                    <PokemonMovesTd>
                        -
                    </PokemonMovesTd>
                )}
                <td>
                    <TLink to={`/moves/${pm?.move?.name}`}>
                        {pm?.move?.name.replace(/-/g, " ")}
                    </TLink>
                </td>
                {moveInfoTable(pm)}
            </TRow>
        ))
    );

    return (
        <PokemonMovesSection>
            <H3>Moves</H3>
            <Method 
                toggleState={toggleState}
                toggleTable={toggleTable}
            />
                <Table>
                    <THead>
                        <tr>
                            <th>
                                {learn === 'level-up' ? 'Level' : learn === 'machine' ? 'Machine' : '-'}
                            </th>
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
                            {emptyMoves}
                            {dataMoves}
                        </>
                    </tbody>
                </Table>
        </PokemonMovesSection>
    )
}

export default Moves