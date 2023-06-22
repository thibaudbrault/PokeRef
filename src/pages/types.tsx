import { MainSmall } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import { Heading, List } from '@/modules/types';
import { TypesList } from '@/modules/types/Styled.Types';
import { IType } from '@/types';
import { getTypes } from '@/utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
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
      <MainSmall>
        <TypesList>
          <List types={types} />
        </TypesList>
      </MainSmall>
    </>
  );
}

export default TypesPage;
