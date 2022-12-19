import React, { Dispatch, SetStateAction } from 'react';
import Desc from './Desc/Desc.PokemonCard';
import Sprite from './Sprite/Sprite.PokemonCard';
import Base from './Base/Base.PokemonCard';
import {
  PokemonDataSection,
  PokemonDataSprite,
} from './Styled.Data.PokemonCard';
import { Pokemon, Species } from '@/types/types';

type Props = {
  pokemon: Pokemon.Pokemon;
  species: Species.Species;
  location: Pokemon.PokemonLocation[];
  game: string;
  caught: boolean;
  setCaught: Dispatch<SetStateAction<boolean>>;
};

function Data({ pokemon, species, location, game, caught, setCaught }: Props) {
  return (
    <PokemonDataSection>
      <div>
        <Desc
          species={species}
          pokemon={pokemon}
          game={game}
          caught={caught}
          setCaught={setCaught}
        />
        <Base
          species={species}
          pokemon={pokemon}
          location={location}
          game={game}
        />
      </div>
      <PokemonDataSprite>
        <Sprite species={species} pokemon={pokemon} />
      </PokemonDataSprite>
    </PokemonDataSection>
  );
}

export default Data;
