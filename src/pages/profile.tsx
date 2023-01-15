import React, { useEffect } from 'react';
import { H2 } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { auth } from '@/firebase-config';
import { useRouter } from 'next/router';
import { usePokedex } from '@/hooks/DataFetch';
import { ProfileList } from '@/components/pages/Profile/Styled.Profile';
import Loader from '@/components/common/ui/Loader/Loader';
import ProfileCard from '@/components/pages/Profile/Components/ProfileCard';

function Profile() {
  const router = useRouter();

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
          {Array(6)
            .fill(true)
            .map((_, i) => (
              <ProfileCard key={i} pokedex={pokedex} />
            ))}
        </ProfileList>
      </section>
    </MainBig>
  );
}

export default Profile;
