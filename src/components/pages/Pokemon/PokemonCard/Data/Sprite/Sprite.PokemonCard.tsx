import React from 'react';
import { Pokemon, Species } from '@/types/types';
import {
  PokemonDataImg,
  PokemonDataLeg,
  PokemonDataMyt,
} from '../Styled.Data.PokemonCard';

type Props = {
  pokemon: Pokemon.Pokemon;
  species: Species.Species;
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
        layout="responsive"
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
