import React from 'react';
import Bars from './Bars/Bars.PokemonCard';
import Typing from './Typing/Typing.PokemonCard';
import { PokemonStatsSection } from './Styled.Stats.PokemonCard';
import { IPokemon, IPokemonType } from '@/types/Pokemon/Pokemon';

type Props = {
  pokemon: IPokemon;
  types: IPokemonType;
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
