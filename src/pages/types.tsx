import { MainSmall } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingTypes from '@/components/pages/Types/Heading';
import { TypesList } from '@/components/pages/Types/Styled.Types';
import { IType } from '@/types/Pokemon/Type';
import { getTypes } from '@/utils/DataFetch';
import {
  dehydrate,
  QueryClient,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

const ListTypes = dynamic(
  () => import(`@/components/pages/Types/Components/List.Types`),
);

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
      <HeadingTypes />
      <MainSmall>
        <TypesList>
          <ListTypes types={types} />
        </TypesList>
      </MainSmall>
    </>
  );
}

export default TypesPage;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: [`types`],
    queryFn: getTypes,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
