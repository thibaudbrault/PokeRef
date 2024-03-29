import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { BASE_URL, getAbilityPokemon, getSingle, QueryKeys } from '@/utils';

import type { IAbility, IAbilityFlavorText, IEffect } from '@/types';

export const useFilterAbility = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: ability,
  }: UseQueryResult<IAbility, Error> = useQuery({
    queryKey: [QueryKeys.ABILITY.INDEX, name],
    queryFn: () => getSingle(`${BASE_URL}/ability/${name}`),
  });

  const { data: pokemon } = useQuery({
    queryKey: [QueryKeys.ABILITY.POKEMON, name, ability],
    queryFn: () => ability && getAbilityPokemon(ability),
    enabled: !!ability,
  });

  const filterEffect = ability?.effect_entries?.find(
    (ae: IEffect) => ae.language.name === `en`,
  );

  const filterOverworld = ability?.effect_entries?.find(
    (ae: IEffect) =>
      ae.language.name === `en` && ae.effect.includes(`\n\nOverworld:`),
  );

  const filterDesc = ability?.flavor_text_entries?.filter(
    (af: IAbilityFlavorText) => af.language.name === `en`,
  );

  return {
    isLoading,
    isError,
    error,
    ability,
    pokemon,
    filterEffect,
    filterOverworld,
    filterDesc,
  };
};
