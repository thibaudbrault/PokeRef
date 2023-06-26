import { IPokemon } from '@/types';
import Image from 'next/image';
import styles from './Sprites.module.scss';

type Props = {
  pokemon: IPokemon;
};

export function Sprites({ pokemon }: Props) {
  return (
    <>
      <section className="section" id="sprites">
        <h3 className="h3">Sprites</h3>
        <div className={styles.sprites}>
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
        </div>
      </section>

      {pokemon.id < 650 && (
        <section className="section">
          <h3 className="h3">Animated sprites</h3>
          <div className={styles.sprites}>
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
          </div>
        </section>
      )}
    </>
  );
}
