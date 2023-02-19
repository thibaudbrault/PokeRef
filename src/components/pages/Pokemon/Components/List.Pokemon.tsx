import { fadeInUpVariant } from '@/components/common/styles/Animations';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { removeDash } from '@/utils/Typography';
import { AnimatePresence, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { PokedexElement, PokedexList, PokedexTypes } from '../Styled.Pokemon';

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

const scrollVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  slideStart: { clipPath: 'inset(100% 0 0 0 round 8px)' },
  slideEnd: { clipPath: 'inset(0% 0 0 0 round 8px)' },
};

function ListPokemon({
  filteredPokedex,
  showPlaceholder,
  setShowPlaceholder,
}: Props) {
  return (
    <AnimatePresence>
      <PokedexList
      // initial="hidden"
      // animate="show"
      // variants={fadeInUpVariant}
      >
        {filteredPokedex?.map((p: IPokemon) => (
          <PokedexElement
            key={p.id}
            variants={scrollVariants}
            initial={['hidden', 'slideStart']}
            whileHover={{ scale: 1.02 }}
            whileInView={['visible', 'slideEnd']}
            exit={['hidden', 'slideStart']}
            viewport={{ amount: 0.4 }}
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
                {removeDash(p.name)
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
      </PokedexList>
    </AnimatePresence>
  );
}

export default ListPokemon;
