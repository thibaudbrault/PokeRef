import React from 'react';
import Breeding from './Breeding/Breeding.PokemonCard';
import Forms from './Forms/Forms.PokemonCard';
import Training from './Training/Training.PokemonCard';
import { PokemonInfoSection } from './StyledInfo.PokemonCard';
import { Evolution, Pokemon, Species } from '@/types/types';

type Props = {
  pokemon: Pokemon.Pokemon;
  species: Species.Species;
  evolution: Evolution.Evolution;
};

function Info({ pokemon, species, evolution }: Props) {
  return (
    <PokemonInfoSection>
      <Breeding pokemon={pokemon} species={species} evolution={evolution} />
      <Training pokemon={pokemon} species={species} />
      <Forms pokemon={pokemon} species={species} />
    </PokemonInfoSection>
  );
}

export default Info;
