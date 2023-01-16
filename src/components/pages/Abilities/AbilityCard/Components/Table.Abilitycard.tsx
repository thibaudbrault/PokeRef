import React from 'react'
import { TableContainer, ModifiedTable, THead } from '@/components/common/styles/Table'
import { Sup } from '../Styled.AbilityCard'
import { Abilities, Pokemon } from '@/types/types'
import dynamic from 'next/dynamic';

const ListAbilityCard = dynamic(
    () =>
        import(
            `@/components/pages/Abilities/AbilityCard/Components/List.AbilityCard`
        ),
);

type Props = {
    ability?: Abilities.Abilities;
    pokedex?: Pokemon.Pokemon[];
}

function TableAbilitycard({ ability, pokedex }: Props) {
    return (
        <TableContainer>
            <ModifiedTable>
                <THead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>
                            1<Sup>st</Sup> ability
                        </th>
                        <th>
                            2<Sup>nd</Sup> ability
                        </th>
                        <th>Hidden ability</th>
                    </tr>
                </THead>
                <tbody>
                    <ListAbilityCard ability={ability} pokedex={pokedex} />
                </tbody>
            </ModifiedTable>
        </TableContainer>
    )
}

export default TableAbilitycard