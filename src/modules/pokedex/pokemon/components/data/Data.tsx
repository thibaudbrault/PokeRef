import { useEffect, useState } from 'react';

import {
  type DocumentData,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import { SuccessToast } from '@/components';
import { auth, db } from '@/firebase-config';
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
  const [user, setUser] = useState<DocumentData | undefined>();

  const getUserDoc = async () => {
    if (auth.currentUser) {
      const usersCollectionRef = doc(db, `users`, auth.currentUser.uid);
      const docSnap = await getDoc(usersCollectionRef);
      setUser(docSnap.data());
    }
  };

  const catchHandler = async () => {
    if (Math.random() < species.capture_rate / 765 && auth.currentUser) {
      const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
      await updateDoc(usersCollectionRef, {
        caught: arrayUnion({
          0: pokemon.name,
          1: pokemon.sprites.front_default,
        }),
      });
      return (
        <SuccessToast
          text={`Congrats 🎉 ! You caught ${removeDash(pokemon.name)}`}
        />
      );
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      getUserDoc();
      const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
      const unsubscribe = onSnapshot(usersCollectionRef, (doc) => {
        setUser(doc.data());
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <section className={styles.section} id="presentation">
      {user &&
        pokemon.id < 10000 &&
        (user.caught.every(
          (n: Record<string, string>) => n[0] !== pokemon.name,
        ) ? (
          <button className={styles.catch} onClick={catchHandler}>
            Catch
          </button>
        ) : (
          <p className={styles.caught}>Caught</p>
        ))}
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
