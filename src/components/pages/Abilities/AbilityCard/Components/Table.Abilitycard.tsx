import React from 'react';
import {
  TableContainer,
  ModifiedTable,
  THead,
} from '@/components/common/styles/Table';
import { Sup } from '../Styled.AbilityCard';
import { Abilities } from '@/types/types';
import dynamic from 'next/dynamic';
import { IPokemon } from '@/types/Pokemon/Pokemon';

const ListAbilityCard = dynamic(
  () =>
    import(
      `@/components/pages/Abilities/AbilityCard/Components/List.AbilityCard`
    ),
);

type Props = {
  ability?: Abilities.Abilities;
  pokedex?: IPokemon[];
};

function TableAbilitycard({ ability, pokedex }: Props) {
  return (
    <TableContainer>
      <ModifiedTable>
        <THead>
          <tr>
            <th>Pokémon</th>
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
  );
}

export default TableAbilitycard;
