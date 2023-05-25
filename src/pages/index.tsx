import { Pagination } from '@/components/common/styles/Pagination';
import { MainBig } from '@/components/common/styles/Sizing';
import { Divider } from '@/components/common/ui/Divider';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingPokedex from '@/components/pages/Pokemon/Heading';
import { useScrollDir } from '@/components/pages/Pokemon/Hooks/useScrollDir';
import { PokedexVerticalText } from '@/components/pages/Pokemon/Styled.Pokemon';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IOptionsOffsetLimit } from '@/utils/DataArrays';
import { getPokedex } from '@/utils/DataFetch';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

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
  const [limit, setLimit] = useState<number>(50);
  // Form of the pokemon (changed with a dropdown)
  const [form, setForm] = useState<IOptionsOffsetLimit | null>(null);
  // Generation of the pokemon (changed with a dropdown)
  const [generation, setGeneration] = useState<IOptionsOffsetLimit | null>(
    null,
  );
  const [page, setPage] = useState<number>(0);

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
    keepPreviousData: true,
  });

  const handlePageChange = (data: { selected: number }) => {
    window.scrollTo(0, 0);
    setPage(data.selected);
    setOffset((50 * data.selected) % 1010);
  };

  if (isError) {
    return toast.error(`Something went wrong: ${error.message}`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
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
          offset={offset}
          setOffset={setOffset}
          page={page}
          setPage={setPage}
          setLimit={setLimit}
          form={form}
          setForm={setForm}
          generation={generation}
          setGeneration={setGeneration}
        />
        <PokedexVerticalText>ポケモン</PokedexVerticalText>
        <ListPokemon filteredPokedex={filteredPokedex} />
        <Divider />
        {scrollBtn()}
        {!form && !generation && (
          <Pagination
            breakLabel="..."
            onPageChange={handlePageChange}
            nextLabel=">"
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.ceil(1010 / 50)}
            previousLabel="<"
            renderOnZeroPageCount={() => null}
          />
        )}
      </MainBig>
    </>
  );
}

export default Pokedex;
