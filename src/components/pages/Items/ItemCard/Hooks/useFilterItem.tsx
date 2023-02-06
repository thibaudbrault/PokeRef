import { getItem } from '@/utils/DataFetch';
import { useQuery } from 'react-query';

export const useFilterItem = (name: string) => {
  const {
    isLoading,
    error,
    data: item,
  } = useQuery({
    queryKey: [`item`],
    queryFn: () => getItem(name),
  });

  const filterEffect =
    item && item?.effect_entries?.find((ie) => ie.language.name === `en`);

  return { isLoading, error, item, filterEffect };
};
