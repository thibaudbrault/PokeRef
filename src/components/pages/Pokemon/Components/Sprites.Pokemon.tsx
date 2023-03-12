import { IPokemon } from '@/types/Pokemon/Pokemon';
import { PokedexImage, SpriteNormal, SpriteShiny } from '../Styled.Pokemon';

type Props = {
  p: IPokemon;
};

function Sprites({ p }: Props) {
  return (
    <PokedexImage>
      {p.id < 152 && p.sprites.versions['generation-i']['red-blue'].front_transparent && (
        <SpriteNormal
          src={p.sprites.versions['generation-i']['red-blue'].front_transparent}
          key={p.sprites.versions['generation-i']['red-blue'].front_transparent}
          alt={p.name}
          width={96}
          height={96}
          fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
        />
      )}
      {p.id > 151 && p.id < 252 && p.sprites.versions['generation-ii'].crystal.front_transparent && p.sprites.versions['generation-ii'].crystal.front_shiny_transparent && (
        <>
          <SpriteNormal
            src={p.sprites.versions['generation-ii'].crystal.front_transparent}
            key={p.sprites.versions['generation-ii'].crystal.front_transparent}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={p.sprites.versions['generation-ii'].crystal.front_shiny_transparent}
            key={p.sprites.versions['generation-ii'].crystal.front_shiny_transparent}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
      {p.id > 251 && p.id < 387 && p.sprites.versions['generation-iii'].emerald.front_default && p.sprites.versions['generation-iii'].emerald.front_shiny && (
        <>
          <SpriteNormal
            src={p.sprites.versions['generation-iii'].emerald.front_default}
            key={p.sprites.versions['generation-iii'].emerald.front_default}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={p.sprites.versions['generation-iii'].emerald.front_shiny}
            key={p.sprites.versions['generation-iii'].emerald.front_shiny}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
      {p.id > 386 && p.id < 494 && p.sprites.versions['generation-iv'].platinum.front_default && p.sprites.versions['generation-iv'].platinum.front_shiny && (
        <>
          <SpriteNormal
            src={p.sprites.versions['generation-iv'].platinum.front_default}
            key={p.sprites.versions['generation-iv'].platinum.front_default}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={p.sprites.versions['generation-iv'].platinum.front_shiny}
            key={p.sprites.versions['generation-iv'].platinum.front_shiny}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
      {p.id > 493 && p.id < 650 && p.sprites.versions['generation-v']['black-white'].front_default && p.sprites.versions['generation-v']['black-white'].front_shiny && (
        <>
          <SpriteNormal
            src={p.sprites.versions['generation-v']['black-white'].front_default}
            key={p.sprites.versions['generation-v']['black-white'].front_default}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={p.sprites.versions['generation-v']['black-white'].front_shiny}
            key={p.sprites.versions['generation-v']['black-white'].front_shiny}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
      {p.id > 649 && (
        <>
          <SpriteNormal
            src={p.sprites.front_default || ``}
            key={p.sprites.front_default || ``}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
          <SpriteShiny
            src={p.sprites.front_shiny || ``}
            key={p.sprites.front_shiny || ``}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
          />
        </>
      )}
    </PokedexImage>
  );
}

export default Sprites;
