import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Span } from '@/components/common/styles/Headings';
import { Type } from '@/components/common/styles/Themes';
import { PokemonDataDesc, PokemonDataTypes } from '../Styled.Data.PokemonCard';
import { Pokemon, Species } from '@/types/types';
import { auth, db } from '@/firebase-config';
import toast from 'react-hot-toast';
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite';

type Props = {
  pokemon: Pokemon.Pokemon;
  species: Species.Species;
  game: string;
};

function Desc({ pokemon, species, game }: Props) {
  const usersCollectionRef = collection(db, `users`);
  const user = auth.currentUser;

  const catchPokemon = async () => {
    if (user) {
      toast.success(`You caught the pokémon`, {
        style: {
          fontSize: `1.7rem`,
        },
      });
      const { uid } = user;
      await setDoc(
        doc(usersCollectionRef, uid),
        {
          favorites: pokemon.name,
        },
        { merge: true },
      );
      await updateDoc(doc(usersCollectionRef, uid), {
        favorites: arrayUnion(pokemon.name),
      });
    } else {
      toast.error(`You need to log in`, {
        style: {
          fontSize: `1.7rem`,
        },
      });
    }
  };

  return (
    <>
      <ul>
        {pokemon.id < 10000 && (
          <PokemonDataDesc>
            {species?.flavor_text_entries?.map(
              (sf) =>
                sf.language.name === `en` &&
                sf.version.name === game && (
                  <>{sf.flavor_text.replace(`\u000c`, ` `).replace(`é`, `É`)}</>
                ),
            )}
            <p>
              Pokémon{` `}
              <Span>
                <i>{game.replace(/-/g, ` `)}</i>
              </Span>
            </p>
          </PokemonDataDesc>
        )}
        <PokemonDataTypes>
          {pokemon?.types?.map((pt) => (
            <Type id={pt.type.name} key={pt.type.name}>
              <Link
                href={{
                  pathname: `/type/[name]`,
                  query: { name: pt.type.name },
                }}
              >
                <Image alt={pt.type.name} width={25} height={25} src={``} />
                <span>{pt.type.name}</span>
              </Link>
            </Type>
          ))}
        </PokemonDataTypes>
      </ul>
    </>
  );
}

export default Desc;
