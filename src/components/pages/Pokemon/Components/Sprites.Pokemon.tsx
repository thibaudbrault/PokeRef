import React from 'react';
import { PokedexImage, SpriteNormal, SpriteShiny } from '../Styled.Pokemon';

type Props = {
  p: {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      front_shiny: string;
    };
  };
};

function Sprites({ p }: Props) {
  return (
    <PokedexImage>
      {p.id < 152 && (
        <SpriteNormal
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${p.id}.png`}
          alt={p.name}
          width={96}
          height={96}
          fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
        />
      )}
      {p.id > 151 && p.id < 252 && (
        <>
          <SpriteNormal
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/${p.id}.png`}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/shiny/${p.id}.png`}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
      {p.id > 251 && p.id < 387 && (
        <>
          <SpriteNormal
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/${p.id}.png`}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/shiny/${p.id}.png`}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
      {p.id > 386 && p.id < 494 && (
        <>
          <SpriteNormal
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/${p.id}.png`}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/shiny/${p.id}.png`}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
      {p.id > 493 && p.id < 650 && (
        <>
          <SpriteNormal
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${p.id}.png`}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/shiny/${p.id}.png`}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
      {p.id > 649 && p.sprites.front_shiny && (
        <>
          <SpriteNormal
            src={p.sprites?.front_default || ``}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={p.sprites?.front_shiny || ``}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
      {!p.sprites.front_shiny && (
        <SpriteNormal
          src={p.sprites?.front_default || ``}
          alt={p.name}
          width={96}
          height={96}
          fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
        />
      )}
    </PokedexImage>
  );
}

export default Sprites;
