import { Base } from './base';
import styles from './Data.module.scss';
import { Description } from './description';
import { Sprite } from './sprite';

import type { IPokemon, IPokemonSpecies } from '@/types';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  game: string;
};

export function Data({ pokemon, species, game }: Props) {
  return (
    <section className={styles.section} id="presentation">
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
