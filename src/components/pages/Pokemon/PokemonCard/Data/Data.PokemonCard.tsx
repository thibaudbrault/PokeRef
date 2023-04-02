import { auth, db } from '@/firebase-config';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { capitalize } from '@/utils/Typography';
import {
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
  DocumentData,
  arrayRemove,
} from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';
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
        caught: arrayUnion(pokemon.name),
      });
      toast.success(`Congrats 🎉 ! You caught ${capitalize(pokemon.name)}`, {
        style: {
          fontSize: `1.7rem`,
        },
      });
    }
  };

  // const releaseHandler = async () => {
  //   if (auth.currentUser) {
  //     const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
  //     await updateDoc(usersCollectionRef, {
  //       caught: arrayRemove(pokemon.name),
  //     });
  //     toast.success(`You released ${capitalize(pokemon.name)}`, {
  //       style: {
  //         fontSize: `1.7rem`,
  //       },
  //     });
  //   }
  // };

  useEffect(() => {
    if (auth.currentUser) {
      getUserDoc();
    }
  }, [auth.currentUser]);

  return (
    <PokemonDataSection id="presentation">
      {user && !user.caught.some((n: string) => n === pokemon.name) ? (
        <PokemonCatchButton onClick={catchHandler}>Catch</PokemonCatchButton>
      ) : (
        <PokemonCaughtText>Caught</PokemonCaughtText>
      )}
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
