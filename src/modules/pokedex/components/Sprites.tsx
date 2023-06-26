import { IPokemon } from '@/types';
import { ImageWithFallback } from '@/utils';
import styles from '../Pokedex.module.scss';

type Props = {
  p: IPokemon;
};

export function Sprites({ p }: Props) {
  return (
    <div className={styles.image}>
      {p.id < 152 &&
        p.sprites.versions[`generation-i`][`red-blue`].front_transparent && (
          <ImageWithFallback
            className={styles.sprite}
            src={
              p.sprites.versions[`generation-i`][`red-blue`].front_transparent
            }
            key={
              p.sprites.versions[`generation-i`][`red-blue`].front_transparent
            }
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`/images/other/unknown.png`}
          />
        )}
      {p.id > 151 &&
        p.id < 252 &&
        p.sprites.versions[`generation-ii`].crystal.front_transparent &&
        p.sprites.versions[`generation-ii`].crystal.front_shiny_transparent && (
          <>
            <ImageWithFallback
              className={styles.sprite}
              src={
                p.sprites.versions[`generation-ii`].crystal.front_transparent
              }
              key={
                p.sprites.versions[`generation-ii`].crystal.front_transparent
              }
              alt={p.name}
              width={96}
              height={96}
              fallbackSrc={`/images/other/unknown.png`}
            />
            <ImageWithFallback
              className={styles.shiny}
              src={
                p.sprites.versions[`generation-ii`].crystal
                  .front_shiny_transparent
              }
              key={
                p.sprites.versions[`generation-ii`].crystal
                  .front_shiny_transparent
              }
              alt={p.name}
              width={96}
              height={96}
              fallbackSrc={`/images/other/unknown.png`}
            />
          </>
        )}
      {p.id > 251 &&
        p.id < 387 &&
        p.sprites.versions[`generation-iii`].emerald.front_default &&
        p.sprites.versions[`generation-iii`].emerald.front_shiny && (
          <>
            <ImageWithFallback
              className={styles.sprite}
              src={p.sprites.versions[`generation-iii`].emerald.front_default}
              key={p.sprites.versions[`generation-iii`].emerald.front_default}
              alt={p.name}
              width={96}
              height={96}
              fallbackSrc={`/images/other/unknown.png`}
            />
            <ImageWithFallback
              className={styles.shiny}
              src={p.sprites.versions[`generation-iii`].emerald.front_shiny}
              key={p.sprites.versions[`generation-iii`].emerald.front_shiny}
              alt={p.name}
              width={96}
              height={96}
              fallbackSrc={`/images/other/unknown.png`}
            />
          </>
        )}
      {p.id > 386 &&
        p.id < 494 &&
        p.sprites.versions[`generation-iv`].platinum.front_default &&
        p.sprites.versions[`generation-iv`].platinum.front_shiny && (
          <>
            <ImageWithFallback
              className={styles.sprite}
              src={p.sprites.versions[`generation-iv`].platinum.front_default}
              key={p.sprites.versions[`generation-iv`].platinum.front_default}
              alt={p.name}
              width={96}
              height={96}
              fallbackSrc={`/images/other/unknown.png`}
            />
            <ImageWithFallback
              className={styles.shiny}
              src={p.sprites.versions[`generation-iv`].platinum.front_shiny}
              key={p.sprites.versions[`generation-iv`].platinum.front_shiny}
              alt={p.name}
              width={96}
              height={96}
              fallbackSrc={`/images/other/unknown.png`}
            />
          </>
        )}
      {p.id > 493 &&
        p.id < 650 &&
        p.sprites.versions[`generation-v`][`black-white`].front_default &&
        p.sprites.versions[`generation-v`][`black-white`].front_shiny && (
          <>
            <ImageWithFallback
              className={styles.sprite}
              src={
                p.sprites.versions[`generation-v`][`black-white`].front_default
              }
              key={
                p.sprites.versions[`generation-v`][`black-white`].front_default
              }
              alt={p.name}
              width={96}
              height={96}
              fallbackSrc={`/images/other/unknown.png`}
            />
            <ImageWithFallback
              className={styles.shiny}
              src={
                p.sprites.versions[`generation-v`][`black-white`].front_shiny
              }
              key={
                p.sprites.versions[`generation-v`][`black-white`].front_shiny
              }
              alt={p.name}
              width={96}
              height={96}
              fallbackSrc={`/images/other/unknown.png`}
            />
          </>
        )}
      {p.id > 649 && (
        <>
          <ImageWithFallback
            className={styles.sprite}
            src={p.sprites.front_default || ``}
            key={p.sprites.front_default || ``}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={`/images/other/unknown.png`}
          />
          <ImageWithFallback
            className={styles.shiny}
            src={p.sprites.front_shiny || ``}
            key={p.sprites.front_shiny || ``}
            alt={p.name}
            width={96}
            height={96}
            fallbackSrc={``}
          />
        </>
      )}
    </div>
  );
}
