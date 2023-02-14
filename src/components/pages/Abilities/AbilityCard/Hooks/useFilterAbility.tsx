import { IAbility, IAbilityFlavorText } from '@/types/Pokemon/Ability';
import { IEffect } from '@/types/Utility/CommonModels';
import { getAbility, getPokedex } from '@/utils/DataFetch';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useFilterAbility = (name: string) => {
  const {
    isLoading,
    isError,
    error,
    data: ability,
  }: UseQueryResult<IAbility, Error> = useQuery({
    queryKey: [`ability`],
    queryFn: () => getAbility(name),
  });

  const { data: pokedex } = useQuery({
    queryKey: [`pokedex`],
    queryFn: () => getPokedex(`https://pokeapi.co/api/v2/pokemon?limit=1400`),
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
    pokedex,
    filterEffect,
    filterOverworld,
    filterDesc,
  };
};
