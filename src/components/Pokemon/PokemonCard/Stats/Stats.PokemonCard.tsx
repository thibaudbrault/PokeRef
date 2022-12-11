import React from 'react';
import Bars from './Bars/Bars.PokemonCard';
import Typing from './Typing/Typing.PokemonCard';
import { PokemonStatsSection } from './StyledStats.PokemonCard';
import { Pokemon } from '@/types/types';

type Props = {
  pokemon: Pokemon.Pokemon;
  types: Pokemon.Types;
  toggleType: number;
  toggleTypeTable: (arg0: number) => void;
};

function Stats({ pokemon, types, toggleType, toggleTypeTable }: Props) {
  return (
    <PokemonStatsSection>
      <Bars pokemon={pokemon} />
      <Typing
        toggleType={toggleType}
        toggleTypeTable={toggleTypeTable}
        pokemon={pokemon}
        types={types}
      />
    </PokemonStatsSection>
  );
}

export default Stats;
