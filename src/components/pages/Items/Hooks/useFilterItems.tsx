import { useItems } from '@/hooks/DataFetch';
import { useState } from 'react';

export const useFilterItems = () => {
  const [search, setSearch] = useState<string | null>(null);

  const { isLoading, error, data: items } = useItems();

  // Filter the items returned when the user type the name in the search bar
  const filterItems = search
    ? items?.filter((items) =>
        items.name
          .replace(/-/g, ` `)
          .toLowerCase()
          .includes(search.toLowerCase()),
      )
    : items?.sort((a, b) => a.name.localeCompare(b.name));

  return { setSearch, isLoading, error, filterItems };
};
