import { MainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingPokedex from '@/components/pages/Pokemon/Heading';
import { useScrollDir } from '@/components/pages/Pokemon/Hooks/useScrollDir';
import { PokedexVerticalText } from '@/components/pages/Pokemon/Styled.Pokemon';
import { IOptions, IOptionsOffsetLimit } from '@/utils/DataArrays';
import { getPokedex } from '@/utils/DataFetch';
import {
  dehydrate,
  QueryClient,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
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
  const [form, setForm] = useState<IOptionsOffsetLimit | null>(null);
  // Type of the pokemon (changed with a dropdown)
  const [type, setType] = useState<IOptions[]>([]);
  // Generation of the pokemon (changed with a dropdown)
  const [generation, setGeneration] = useState<IOptionsOffsetLimit | null>(
    null,
  );
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const { scrollBtn } = useScrollDir();

  const {
    isLoading,
    isError,
    error,
    data: pokedex,
  }: UseQueryResult<IPokemon[], Error> = useQuery({
    queryKey: [`pokedex`, limit, offset],
    queryFn: () =>
      getPokedex(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      ),
  });

  if (isError) {
    return toast.error(`Something went wrong: ${error.message}`);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingPokedex />
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
        <ListPokemon
          filteredPokedex={filteredPokedex}
          showPlaceholder={showPlaceholder}
          setShowPlaceholder={setShowPlaceholder}
        />
        {scrollBtn()}
      </MainBig>
    </>
  );
}

export default Pokedex;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: [`pokedex`],
    queryFn: () =>
      getPokedex(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1008`),
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
