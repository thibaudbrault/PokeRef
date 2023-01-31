import React from 'react';
import { MainSmall } from '@/components/common/styles/Sizing';
import { TypesList } from '@/components/pages/Types/Styled.Types';
import { useTypes } from '@/utils/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingTypes from '@/components/pages/Types/Heading';
import dynamic from 'next/dynamic';

const ListTypes = dynamic(
  () => import(`@/components/pages/Types/Components/List.Types`),
);

function TypesPage() {
  const { isLoading, error, data: types } = useTypes();

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
