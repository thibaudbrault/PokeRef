import { Divider } from '@/components/common/ui/Divider';
import Loader from '@/components/common/ui/Loader/Loader';
import { Filters, Heading, List, useScrollDir } from '@/modules/pokedex';
import styles from '@/modules/pokedex/Pokedex.module.scss';
import { IPokemon } from '@/types';
import { IOptionsOffsetLimit, getPokedex } from '@/utils';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

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
        <p className={styles.verticalText}>ポケモン</p>
        <List filteredPokedex={filteredPokedex} />
        <Divider />
        {scrollBtn()}
        {!form && !generation && (
          <ReactPaginate
            containerClassName="pagination"
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
