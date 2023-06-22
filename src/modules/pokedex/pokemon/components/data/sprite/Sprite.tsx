import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { PokemonDataImg, PokemonDataSpecial } from '../Styled.Data.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
};

export function Sprite({ pokemon, species }: Props) {
  return (
    <>
      <PokemonDataImg
        src={pokemon.sprites.other[`official-artwork`].front_default}
        alt={pokemon.name}
        loading="lazy"
        width="75%"
        height="75%"
      />
      {pokemon.id < 10000 && (
        <>
          {species?.is_legendary && (
            <PokemonDataSpecial>Legendary</PokemonDataSpecial>
          )}
          {species?.is_mythical && (
            <PokemonDataSpecial>Mythical</PokemonDataSpecial>
          )}
          {species.is_baby && <PokemonDataSpecial>Baby</PokemonDataSpecial>}
        </>
      )}
    </>
  );
}
