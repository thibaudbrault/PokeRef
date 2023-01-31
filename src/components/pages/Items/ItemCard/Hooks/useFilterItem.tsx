import { useItem } from '@/utils/DataFetch';

export const useFilterItem = (name: string | string[] | undefined) => {
  const {
    isLoading,
    error,
    data: item,
  } = useItem(`https://pokeapi.co/api/v2/item/${name}`);

  const filterEffect =
    item && item?.effect_entries?.find((ie) => ie.language.name === `en`);

  return { isLoading, error, item, filterEffect };
};
