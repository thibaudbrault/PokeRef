import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import { ErrorToast, Loader } from '@/components';
import { Heading, List } from '@/modules/types';
import styles from '@/modules/types/Types.module.scss';
import { getTypes } from '@/utils';

import type { IType } from '@/types';

function TypesPage() {
  const {
    isLoading,
    isError,
    error,
    data: types,
  }: UseQueryResult<IType[], Error> = useQuery({
    queryKey: [`types`],
    queryFn: getTypes,
  });

  if (isError) {
    return <ErrorToast error={error} />;
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
