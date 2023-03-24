import { H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import Image from 'next/image';
import { PokemonSpritesDiv } from './Styled.Sprites.PokemonCard';

type Props = {
  pokemon: IPokemon;
};

function Sprites({ pokemon }: Props) {
  return (
    <>
      <Section>
        <H3>Sprites</H3>
        <PokemonSpritesDiv>
          <div>
            <Image
              src={pokemon?.sprites?.front_default}
              alt={pokemon.name}
              width={96}
              height={96}
            />
            <p>Front Default</p>
          </div>
          {pokemon?.sprites?.back_default && (
            <div>
              <Image
                src={pokemon?.sprites?.back_default}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Back Default</p>
            </div>
          )}
          {pokemon?.sprites?.front_female && (
            <div>
              <Image
                src={pokemon?.sprites?.front_female}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Front Female</p>
            </div>
          )}
          {pokemon?.sprites?.back_female && (
            <div>
              <Image
                src={pokemon?.sprites?.back_female}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Back Female</p>
            </div>
          )}
          {pokemon?.sprites?.front_shiny && (
            <div>
              <Image
                src={pokemon?.sprites?.front_shiny}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Front Shiny</p>
            </div>
          )}
          {pokemon.sprites.back_shiny && (
            <div>
              <Image
                src={pokemon?.sprites?.back_shiny}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Back Shiny</p>
            </div>
          )}
          {pokemon?.sprites?.front_shiny_female && (
            <div>
              <Image
                src={pokemon?.sprites?.front_shiny_female}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Front Shiny Female</p>
            </div>
          )}
          {pokemon?.sprites?.back_shiny_female && (
            <div>
              <Image
                src={pokemon?.sprites?.back_shiny_female}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Back Shiny Female</p>
            </div>
          )}
        </PokemonSpritesDiv>
      </Section>

      {pokemon.id < 650 && (
        <Section>
          <H3>Animated sprites</H3>
          <PokemonSpritesDiv>
            <div>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Front Default</p>
            </div>
            <div>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${pokemon.id}.gif`}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Back Default</p>
            </div>
            {pokemon.sprites.front_female && (
              <div>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/female/${pokemon.id}.gif`}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                />
                <p>Front Female</p>
              </div>
            )}
            {pokemon.sprites.back_female && (
              <div>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/female/${pokemon.id}.gif`}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                />
                <p>Back Female</p>
              </div>
            )}
            <div>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${pokemon.id}.gif`}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Front Shiny</p>
            </div>
            <div>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/${pokemon.id}.gif`}
                alt={pokemon.name}
                width={96}
                height={96}
              />
              <p>Back Shiny</p>
            </div>
            {pokemon.sprites.front_shiny_female && (
              <div>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/female/${pokemon.id}.gif`}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                />
                <p>Front Shiny Female</p>
              </div>
            )}
            {pokemon.sprites.back_shiny_female && (
              <div>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/shiny/female/${pokemon.id}.gif`}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                />
                <p>Back Shiny Female</p>
              </div>
            )}
          </PokemonSpritesDiv>
        </Section>
      )}
    </>
  );
}

export default Sprites;
