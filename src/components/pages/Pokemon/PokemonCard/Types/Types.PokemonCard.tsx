import { H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IType } from '@/types/Pokemon/Type';
import { PokemonTypesContainer } from './Styled.Types.PokemonCard';
import TableTyping from './Table/Table.Types.PokemonCard';

type Props = {
  pokemon: IPokemon;
  types?: IType[];
};

function Typing({ pokemon, types }: Props) {
  return (
    <Section>
      <H3>Types relations</H3>
      <PokemonTypesContainer>
        <TableTyping target="to" />
        <TableTyping target="from" />
      </PokemonTypesContainer>
    </Section>
  );
}

export default Typing;
