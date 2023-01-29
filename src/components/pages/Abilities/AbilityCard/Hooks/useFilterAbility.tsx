import { useAbility, usePokedex } from '@/hooks/DataFetch';

export const useFilterAbility = (name: string | string[] | undefined) => {
  const {
    isLoading,
    error,
    data: ability,
  } = useAbility(`https://pokeapi.co/api/v2/ability/${name}`);

  const { data: pokedex } = usePokedex(
    `https://pokeapi.co/api/v2/pokemon?limit=1300`,
  );

  const filterEffect = ability?.effect_entries?.find(
    (ae) => ae.language.name === `en`,
  );

  const filterOverworld = ability?.effect_entries?.find(
    (ae) => ae.language.name === `en` && ae.effect.includes(`\n\nOverworld:`),
  );

  const filterDesc = ability?.flavor_text_entries?.filter(
    (af) => af.language.name === `en`,
  );

  return {
    isLoading,
    error,
    ability,
    pokedex,
    filterEffect,
    filterOverworld,
    filterDesc,
  };
};
