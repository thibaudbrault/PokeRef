import React from 'react';
import Desc from './Desc/Desc.PokemonCard';
import Sprite from './Sprite/Sprite.PokemonCard';
import Base from './Base/Base.PokemonCard';
import {
  PokemonDataSection,
  PokemonDataSprite,
} from './StyledData.PokemonCard';

function Data({ pokemon, species, location, game }) {
  return (
    <PokemonDataSection>
      <div>
        <Desc species={species} pokemon={pokemon} game={game} />
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
