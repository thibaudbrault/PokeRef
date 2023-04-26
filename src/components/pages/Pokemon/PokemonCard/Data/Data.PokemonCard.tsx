import { auth, db } from '@/firebase-config';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { removeDash } from '@/utils/Typography';
import {
  arrayUnion,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Base from './Base/Base.PokemonCard';
import Desc from './Desc/Desc.PokemonCard';
import Sprite from './Sprite/Sprite.PokemonCard';
import {
  PokemonCatchButton,
  PokemonCaughtText,
  PokemonDataContainer,
  PokemonDataSection,
  PokemonDataSprite,
} from './Styled.Data.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  game: string | null;
};

function Data({ pokemon, species, game }: Props) {
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
      toast.success(`Congrats 🎉 ! You caught ${removeDash(pokemon.name)}`, {
        style: {
          fontSize: `1.7rem`,
          textTransform: `capitalize`,
        },
      });
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
  }, [auth.currentUser]);

  console.log(user);

  return (
    <PokemonDataSection id="presentation">
      {user &&
        pokemon.id < 10000 &&
        (user.caught.every(
          (n: Record<string, string>) => n[0] !== pokemon.name,
        ) ? (
          <PokemonCatchButton onClick={catchHandler}>Catch</PokemonCatchButton>
        ) : (
          <PokemonCaughtText>Caught</PokemonCaughtText>
        ))}
      <PokemonDataContainer>
        <Desc species={species} pokemon={pokemon} game={game} />
        <Base species={species} pokemon={pokemon} />
      </PokemonDataContainer>
      <PokemonDataSprite>
        <Sprite species={species} pokemon={pokemon} />
      </PokemonDataSprite>
    </PokemonDataSection>
  );
}

export default Data;
