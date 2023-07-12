import { useState } from 'react';

import { SuccessToast } from '@/components';
import { removeDash } from '@/utils';

import { Base } from './base';
import styles from './Data.module.scss';
import { Description } from './description';
import { Sprite } from './sprite';

import type { IPokemon, IPokemonSpecies } from '@/types';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  game: string | null;
};

export function Data({ pokemon, species, game }: Props) {
  // will have the user's info
  const [user, setUser] = useState();

  const catchHandler = async () => {
    if (Math.random() < species.capture_rate / 765) {
      // will have the catch function
      return (
        <SuccessToast
          text={`Congrats 🎉 ! You caught ${removeDash(pokemon.name)}`}
        />
      );
    }
  };

  return (
    <section className={styles.section} id="presentation">
      {/* {user &&
        pokemon.id < 10000 &&
        (user.caught.every(
          (n: Record<string, string>) => n[0] !== pokemon.name,
        ) ? (
          <button className={styles.catch} onClick={catchHandler}>
            Catch
          </button>
        ) : (
          <p className={styles.caught}>Caught</p>
        ))} */}
      <div className={styles.container}>
        <Description species={species} pokemon={pokemon} game={game} />
        <Base species={species} pokemon={pokemon} />
      </div>
      <div className={styles.sprite}>
        <Sprite species={species} pokemon={pokemon} />
      </div>
    </section>
  );
}
