import { H3 } from '@/components/common/styles/Headings';
import { MethodNav } from '@/components/common/styles/Navbars';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IType } from '@/types/Pokemon/Type';
import { useState } from 'react';
import { PokemonTypesContainer } from '../Styled.Stats.PokemonCard';
import TableTyping from './Table.Typing.PokemonCard';

type Props = {
  pokemon: IPokemon;
  types?: IType[];
};

function Typing({ pokemon, types }: Props) {
  const [toggle, setToggle] = useState<number>(1);
  const pageShown = () => {
    if (toggle === 1) {
      return <TableTyping target="to" />;
    } else if (toggle === 2) {
      return <TableTyping target="from" />;
    }
  };

  return (
    <PokemonTypesContainer>
      <H3>Types relations</H3>
      <MethodNav>
        <button
          className={toggle === 1 ? `button_active` : ``}
          onClick={() => setToggle(1)}
        >
          <p>Attack</p>
        </button>
        <button
          className={toggle === 2 ? `button_active` : ``}
          onClick={() => setToggle(2)}
        >
          <p>Defense</p>
        </button>
      </MethodNav>
      {pageShown()}
    </PokemonTypesContainer>
  );
}

export default Typing;
