import { useState } from 'react';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import { Loader, Separator, errorToast } from '@/components';
import { Filters, Heading, List, useScrollDir } from '@/modules/pokedex';
import styles from '@/modules/pokedex/Pokedex.module.scss';
import { getPokedex, type IOptionsOffsetLimit } from '@/utils';

import type { IPokemon } from '@/types';

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

  if (isError && error instanceof Error) {
    errorToast(error.message);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <main className="mainBig">
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
        <Separator />
        <p className={styles.explanation}>
          Click on a Pokémon's name to get the Pokémon info / Click on a type to
          get the type info
        </p>
        <p className={styles.verticalText}>ポケモン</p>
        <List filteredPokedex={filteredPokedex} />
        <Separator />
        {scrollBtn()}
        {!form && !generation && (
          <ReactPaginate
            className="pagination"
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
      </main>
    </>
  );
}

export default Pokedex;
