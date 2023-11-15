import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { BASE_URL, getSingle, QueryKeys } from '@/utils';

import type { IItem } from '@/types';

export const useFilterItem = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: item,
  }: UseQueryResult<IItem, Error> = useQuery({
    queryKey: [QueryKeys.ITEM, name],
    queryFn: () => getSingle(`${BASE_URL}/item/${name}`),
  });

  const filterEffect =
    item && item?.effect_entries?.find((ie) => ie.language.name === `en`);

  return { isLoading, isError, error, item, filterEffect };
};
