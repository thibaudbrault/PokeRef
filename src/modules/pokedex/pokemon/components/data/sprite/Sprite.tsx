import { IPokemon, IPokemonSpecies } from '@/types';
import styles from '../Data.module.scss';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
};

export function Sprite({ pokemon, species }: Props) {
  return (
    <>
      <img
        className={styles.images}
        src={pokemon.sprites.other[`official-artwork`].front_default}
        alt={pokemon.name}
        loading="lazy"
        width="75%"
        height="75%"
      />
      {pokemon.id < 10000 && (
        <>
          {species?.is_legendary && (
            <span className={styles.special}>Legendary</span>
          )}
          {species?.is_mythical && (
            <span className={styles.special}>Mythical</span>
          )}
          {species.is_baby && <span className={styles.special}>Baby</span>}
        </>
      )}
    </>
  );
}
