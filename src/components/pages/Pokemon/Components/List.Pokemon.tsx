import { IPokemon } from '@/types/Pokemon/Pokemon';
import { removeDash, removeLongName } from '@/utils/Typography';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { PokedexElement, PokedexList, PokedexTypes } from '../Styled.Pokemon';

interface ITypesProps {
  p: IPokemon;
}

const Sprites = dynamic(
  () => import(`@/components/pages/Pokemon/Components/Sprites.Pokemon`),
);
const TypesPokemon = dynamic<ITypesProps>(
  () => import(`@/components/pages/Pokemon/Components/Types.Pokemon`) as any,
);

type Props = {
  filteredPokedex: IPokemon[];
};

function ListPokemon({ filteredPokedex }: Props) {
  return (
    <PokedexList data-test-id="pokemonList">
      {filteredPokedex?.map((p: IPokemon) => (
        <PokedexElement key={p.id} data-test-id="pokemonElement">
          <Sprites p={p} />
          {p.id < 1011 && (
            <p className="number">#{p.id.toString().padStart(3, `0`)}</p>
          )}
          <h2>
            <Link
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: p?.name },
              }}
              key={p.name}
            >
              {removeLongName(removeDash(p.name))}
            </Link>
          </h2>
          <PokedexTypes>
            <TypesPokemon p={p} />
          </PokedexTypes>
        </PokedexElement>
      ))}
    </PokedexList>
  );
}

export default ListPokemon;
