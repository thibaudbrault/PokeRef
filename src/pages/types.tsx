import React from 'react';
import { MainSmall } from '@/components/common/styles/Sizing';
import { TypesList } from '@/components/pages/Types/Styled.Types';
import { getTypes, useTypes } from '@/utils/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingTypes from '@/components/pages/Types/Heading';
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';

const ListTypes = dynamic(
  () => import(`@/components/pages/Types/Components/List.Types`),
);

function TypesPage({ initialTypes }) {
  const {
    isLoading,
    error,
    data: types,
  } = useQuery({
    queryKey: [`types`],
    queryFn: getTypes,
    initialData: initialTypes,
  });

  if (error instanceof Error) {
    return { error };
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

export async function getServerSideProps() {
  const initialTypes = await getTypes();
  return {
    props: {
      initialTypes,
    },
  };
}
