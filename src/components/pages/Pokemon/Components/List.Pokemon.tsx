import { fadeInUpVariant } from '@/components/common/styles/Keyframes';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { PokedexElement, PokedexTypes } from '../Styled.Pokemon';

const Sprites = dynamic(
  () => import(`@/components/pages/Pokemon/Components/Sprites.Pokemon`),
);
const TypesPokemon = dynamic(
  () => import(`@/components/pages/Pokemon/Components/Types.Pokemon`),
);

type Props = {
  filteredPokedex: IPokemon[];
  showPlaceholder: boolean;
  setShowPlaceholder: Dispatch<SetStateAction<boolean>>;
};

function ListPokemon({
  filteredPokedex,
  showPlaceholder,
  setShowPlaceholder,
}: Props) {
  return (
    <AnimatePresence>
      <motion.ul initial="hidden" animate="show" variants={fadeInUpVariant}>
        {filteredPokedex?.map((p: IPokemon) => (
          <PokedexElement
            key={p.id}
            initial="hidden"
            animate="show"
            variants={fadeInUpVariant}
          >
            <Sprites
              p={p}
              showPlaceholder={showPlaceholder}
              setShowPlaceholder={setShowPlaceholder}
            />
            {p.id < 1008 && <p>#{p.id.toString().padStart(3, `0`)}</p>}
            <h2 data-testid="pokemonName">
              <Link
                href={{
                  pathname: `/pokemon/[name]`,
                  query: { name: p?.name },
                }}
                key={p.name}
              >
                {p.name
                  .replace(/-/g, ` `)
                  .replace(`single strike`, ``)
                  .replace(`rapid strike`, ``)
                  .replace(`red meteor`, ``)}
              </Link>
            </h2>
            <PokedexTypes>
              <TypesPokemon p={p} />
            </PokedexTypes>
          </PokedexElement>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}

export default ListPokemon;
