import { IItem } from '@/types/Items/Item';
import { getItem } from '@/utils/DataFetch';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

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
