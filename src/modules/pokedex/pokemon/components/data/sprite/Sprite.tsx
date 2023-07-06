import { IPokemon, IPokemonSpecies } from '@/types';
import styles from '../Data.module.scss';
import Image from 'next/image';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
};

export function Sprite({ pokemon, species }: Props) {
  return (
    <>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={pokemon.sprites.other[`official-artwork`].front_default}
          alt={pokemon.name}
          fill={true}
        />
      </div>
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
