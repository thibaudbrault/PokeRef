import { MainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingPokemon from '@/components/pages/Pokemon/Heading';
import { useScrollDir } from '@/components/pages/Pokemon/Hooks/useScrollDir';
import {
  PokedexList,
  PokedexVerticalText,
} from '@/components/pages/Pokemon/Styled.Pokemon';
import { useStateWithCallback } from '@/hooks/useStateWithCallback';
import { Options, OptionsOffsetLimit } from '@/utils/DataArrays';
import { getPokedex } from '@/utils/DataFetch';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IPokemon } from '../types/Pokemon/Pokemon';

const Filters = dynamic(
  () => import(`@/components/pages/Pokemon/Components/Filters.Pokemon`),
);
const ListPokemon = dynamic(
  () => import(`@/components/pages/Pokemon/Components/List.Pokemon`),
);

function Pokedex() {
  const [filteredPokedex, setFilteredPokedex] = useState<IPokemon[]>([]);
  // Modify the first pokemon displayed
  const [offset, setOffset] = useState<number>(0);
  //Modify the max number of pokemon displayed
  const [limit, setLimit] = useState<number>(1008);
  // Form of the pokemon (changed with a dropdown)
  const [form, setForm] = useStateWithCallback<OptionsOffsetLimit | null>(null);
  // Type of the pokemon (changed with a dropdown)
  const [type, setType] = useStateWithCallback<Options[]>([]);
  // Generation of the pokemon (changed with a dropdown)
  const [generation, setGeneration] =
    useStateWithCallback<OptionsOffsetLimit | null>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const { scrollBtn } = useScrollDir();

  const {
    isLoading,
    error,
    data: pokedex,
  } = useQuery({
    queryKey: [`pokedex`, limit, offset],
    queryFn: () =>
      getPokedex(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      ),
  });

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingPokemon />
      <MainBig>
        <Filters
          pokedex={pokedex}
          setFilteredPokedex={setFilteredPokedex}
          setOffset={setOffset}
          setLimit={setLimit}
          form={form}
          setForm={setForm}
          type={type}
          setType={setType}
          generation={generation}
          setGeneration={setGeneration}
          setShowPlaceholder={setShowPlaceholder}
        />
        <PokedexVerticalText>ポケモン</PokedexVerticalText>
        <PokedexList>
          <ListPokemon
            filteredPokedex={filteredPokedex}
            showPlaceholder={showPlaceholder}
            setShowPlaceholder={setShowPlaceholder}
          />
        </PokedexList>
        {scrollBtn()}
      </MainBig>
    </>
  );
}

export default Pokedex;

// export async function getServerSideProps() {
//   const initialPokedex = await getPokedex(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1008`)
//   console.log(initialPokedex)
//   return {
//     props: {
//       initialPokedex
//     }
//   }
// }
