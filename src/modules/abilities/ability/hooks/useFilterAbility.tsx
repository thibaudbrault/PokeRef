import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { getAbilityPokemon, getSingle } from '@/utils';

import type { IAbility, IAbilityFlavorText, IEffect } from '@/types';

export const useFilterAbility = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: ability,
  }: UseQueryResult<IAbility, Error> = useQuery({
    queryKey: [`ability`, name],
    queryFn: () => getSingle(`https://pokeapi.co/api/v2/ability/${name}`),
  });

  const { data: pokemon } = useQuery({
    queryKey: [`abilityPokemon`, name, ability],
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
