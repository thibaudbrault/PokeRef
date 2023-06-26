import { IPokemon } from '@/types';
import { removeDash, removeLongName } from '@/utils';
import Link from 'next/link';
import styles from '../Pokedex.module.scss';
import { Sprites } from './Sprites';
import { Types } from './Types';

type Props = {
  filteredPokedex: IPokemon[];
};

export function List({ filteredPokedex }: Props) {
  return (
    <ul className={styles.list} data-test-id="pokemonList">
      {filteredPokedex?.map((p: IPokemon) => (
        <li className={styles.element} key={p.id} data-test-id="pokemonElement">
          <Sprites p={p} />
          {p.id < 1011 && (
            <p className={styles.number}>#{p.id.toString().padStart(3, `0`)}</p>
          )}
          <h2>
            <Link
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: p?.name },
              }}
              key={p.name}
            >
              {removeLongName(removeDash(p.name))}
            </Link>
          </h2>
          <div className={styles.types}>
            <Types p={p} />
          </div>
        </li>
      ))}
    </ul>
  );
}
