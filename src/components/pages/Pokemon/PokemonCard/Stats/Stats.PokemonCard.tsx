import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IType } from '@/types/Pokemon/Type';
import Bars from './Bars/Bars.PokemonCard';
import { PokemonStatsSection } from './Styled.Stats.PokemonCard';
import Typing from './Typing/Typing.PokemonCard';

type Props = {
  pokemon: IPokemon;
  types: IType[];
};

function Stats({ pokemon, types }: Props) {
  return (
    <PokemonStatsSection>
      <Bars pokemon={pokemon} />
      <Typing pokemon={pokemon} types={types} />
    </PokemonStatsSection>
  );
}

export default Stats;
