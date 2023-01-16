import { useItem } from "@/hooks/DataFetch";

export const useFilterItem = () => {
    const {
        isLoading,
        error,
        data: item,
    } = useItem(`https://pokeapi.co/api/v2/item/${name}`);

    const filterEffect = item?.effect_entries.find(
        (ie) => ie.language.name === `en`,
    );

    return { isLoading, error, item, filterEffect }
}