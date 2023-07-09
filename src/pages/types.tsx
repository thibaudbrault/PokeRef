import { ErrorToast, Loader } from '@/components';
import { Heading, List } from '@/modules/types';
import styles from '@/modules/types/Types.module.scss';
import { IType } from '@/types';
import { getTypes } from '@/utils';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

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
