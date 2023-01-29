import React, { useState } from 'react';
import {
  PokedexList,
  PokedexVerticalText,
} from '@/components/pages/Pokemon/Styled.Pokemon';
import { MainBig } from '@/components/common/styles/Sizing';
import { usePokedex } from '@/hooks/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import dynamic from 'next/dynamic';
import { Pokemon } from '@/types/types';
import { useStateWithCallback } from '@/hooks/useStateWithCallback';
import { Options, OptionsOffsetLimit } from '@/utils/DataArrays';
import { useScrollDir } from '@/components/pages/Pokemon/Hooks/useScrollDir';
import HeadingPokemon from '@/components/pages/Pokemon/Heading';

const Filters = dynamic(
  () => import(`@/components/pages/Pokemon/Components/Filters.Pokemon`),
);
const ListPokemon = dynamic(
  () => import(`@/components/pages/Pokemon/Components/List.Pokemon`),
);

function Pokedex() {
  const [filteredPokedex, setFilteredPokedex] = useState<Pokemon.Pokemon[]>([]);
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

  const { scrollBtn } = useScrollDir();

  const {
    isLoading,
    error,
    data: pokedex,
  } = usePokedex(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );

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
        />
        <PokedexVerticalText>ポケモン</PokedexVerticalText>
        <PokedexList>
          <ListPokemon
            filteredPokedex={filteredPokedex}
          />
        </PokedexList>
        {scrollBtn()}
      </MainBig>
    </>
  );
}

export default Pokedex;
