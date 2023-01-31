import { useAbilities } from '@/utils/DataFetch';
import { useState } from 'react';

export const useFilterAbilities = () => {
  const [search, setSearch] = useState<string | null>(null);
  const { isLoading, error, data: abilities } = useAbilities();

  // Filter the abilities returned when the user type the name in the search bar
  const filterAbilities = search
    ? abilities?.filter((abilities) =>
      abilities.name
        .replace(/-/g, ` `)
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    : abilities;

  // Filter the effect to only get the first returned by the api that is in english
  const filterEffect =
    filterAbilities &&
    filterAbilities?.map((a) =>
      a.flavor_text_entries.find((af) => af.language.name === `en`),
    );
  return { setSearch, isLoading, error, abilities, filterAbilities, filterEffect };
};
