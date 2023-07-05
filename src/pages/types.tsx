import { Loader } from '@/components';
import { Heading, List } from '@/modules/types';
import styles from '@/modules/types/Types.module.scss';
import { IType } from '@/types';
import { getTypes } from '@/utils';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
      <main className="mainSmall">
        <ul className={styles.list}>
          <List types={types} />
        </ul>
      </main>
    </>
  );
}

export default TypesPage;
