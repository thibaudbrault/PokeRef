import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import {
  PokemonDataImg,
  PokemonDataLeg,
  PokemonDataMyt,
} from '../Styled.Data.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
};

function Sprite({ pokemon, species }: Props) {
  return (
    <>
      <PokemonDataImg
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
        loading="lazy"
        width="75%"
        height="75%"
      />
      <>
        {species?.is_legendary === true && (
          <PokemonDataLeg>Legendary</PokemonDataLeg>
        )}
        {species?.is_mythical === true && (
          <PokemonDataMyt>Mythical</PokemonDataMyt>
        )}
      </>
    </>
  );
}

export default Sprite;
