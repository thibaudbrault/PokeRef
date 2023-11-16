import { useState } from 'react';

import {
  dehydrate,
  QueryClient,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

import { errorToast, Loader, Separator } from '@/components';
import { Filters, Heading, List, useScrollDir } from '@/modules/pokedex';
import styles from '@/modules/pokedex/Pokedex.module.scss';
import {
  getMultiple,
  QueryKeys,
  type IOptionsOffsetLimit,
  BASE_URL,
  Limit,
} from '@/utils';

import type { IPokemon } from '@/types';

function Pokedex() {
  const router = useRouter();

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
    queryKey: [QueryKeys.POKEDEX, limit, offset],
    queryFn: () =>
      getMultiple(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`),
    keepPreviousData: true,
  });

  const handlePageChange = (data: { selected: number }) => {
    if (data.selected > 0) {
      router.push(`?page=${data.selected + 1}`);
    } else {
      router.push(``);
    }
    window.scrollTo(0, 0);
    setPage(data.selected);
    setOffset((50 * data.selected) % Limit.POKEMON);
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
            pageCount={Math.ceil(Limit.POKEMON / 50)}
            previousLabel="<"
            renderOnZeroPageCount={() => null}
          />
        )}
      </main>
    </>
  );
}

export default Pokedex;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.POKEDEX, 50, 0],
    queryFn: () => getMultiple(`${BASE_URL}/pokemon?offset=0&limit=50`),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
