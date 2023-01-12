import React, { useEffect, useState } from 'react';
import { H2 } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { auth } from '@/firebase-config';
import { useRouter } from 'next/router';
import { usePokedex } from '@/hooks/DataFetch';
import { ProfileList } from '@/components/pages/Profile/Styled.Profile';
import Loader from '@/components/common/ui/Loader/Loader';
import ProfileCard from '@/components/pages/Profile/Components/ProfileCard';
import { Pokemon } from '@/types/types';

function Profile() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon.Pokemon | null>(null);
  const [pokemonAbility, setPokemonAbility] =
    useState<Pokemon.Abilities | null>(null);
  const [pokemonMove, setPokemonMove] = useState<Pokemon.Moves | null>(null);

  const {
    isLoading,
    error,
    data: pokedex,
  } = usePokedex(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=905`);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(`/`);
    }
  }, []);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MainBig>
      <H2>Create teams</H2>
      <section>
        <ProfileList>
          <ProfileCard
            pokedex={pokedex}
            pokemon={pokemon}
            setPokemon={setPokemon}
            pokemonAbility={pokemonAbility}
            setPokemonAbility={setPokemonAbility}
            pokemonMove={pokemonMove}
            setPokemonMove={setPokemonMove}
          />
          {/* <ProfileCard
            pokedex={pokedex}
            pokemon={pokemon}
            setPokemon={setPokemon}
            pokemonAbility={pokemonAbility}
            setPokemonAbility={setPokemonAbility}
          /> */}
        </ProfileList>
      </section>
    </MainBig>
  );
}

export default Profile;
