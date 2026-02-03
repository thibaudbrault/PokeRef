import { useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { BASE_URL, Limit, QueryKeys, getMultiple } from '@/utils';
import { IItem } from '~/src/types';

export const useItemsQuery = () => {
  const limit = 50;
  const [offset, setOffset] = useState(0);

  const { data: items, status: itemsStatus } = useQuery<IItem[], Error>({
    queryKey: [QueryKeys.ITEMS, limit, offset],
    queryFn: () =>
      getMultiple(`${BASE_URL}/item?limit=${limit}&offset=${offset}`),
    placeholderData: keepPreviousData,
  });

  const { data: berries, status: berriesStatus } = useQuery({
    queryKey: [QueryKeys.BERRIES],
    queryFn: () => getMultiple(`${BASE_URL}/berry?limit=${Limit.BERRIES}`),
  });

  return { setOffset, items, itemsStatus, berries, berriesStatus };
};
