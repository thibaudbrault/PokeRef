import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { errorToast, Loader } from '@/components';
import { Heading, List } from '@/modules/types';
import styles from '@/modules/types/Types.module.scss';
import { getMultiple } from '@/utils';

import type { IType } from '@/types';

function TypesPage() {
  const {
    isLoading,
    isError,
    error,
    data: types,
  }: UseQueryResult<IType[], Error> = useQuery({
    queryKey: [`types`],
    queryFn: () => getMultiple(`https://pokeapi.co/api/v2/type?limit=18`),
  });

  if (isError && error instanceof Error) {
    errorToast(error.message);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <main className="mainSmall">
        <ul className={styles.list}>
          <List types={types} />
        </ul>
      </main>
    </>
  );
}

export default TypesPage;
