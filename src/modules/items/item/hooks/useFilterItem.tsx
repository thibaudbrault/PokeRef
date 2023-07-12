import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { getItem } from '@/utils';

import type { IItem } from '@/types';

export const useFilterItem = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: item,
  }: UseQueryResult<IItem, Error> = useQuery({
    queryKey: [`item`, name],
    queryFn: () => getItem(name),
  });

  const filterEffect =
    item && item?.effect_entries?.find((ie) => ie.language.name === `en`);

  return { isLoading, isError, error, item, filterEffect };
};
