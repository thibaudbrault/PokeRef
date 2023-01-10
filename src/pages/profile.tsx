import React, { useEffect, useState } from 'react';
import { H2 } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { auth } from '@/firebase-config';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Dropdown } from '@/components/common/styles/Inputs';
import { usePokedex } from '@/hooks/DataFetch';
import { ProfileList } from '@/components/pages/Profile/Styled.Profile';

function Profile() {
  const router = useRouter();

  const [pokemon, setPokemon] = useState(null);

  const {
    isLoading,
    error,
    data: pokedex,
  } = usePokedex(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=905`);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(`/`);
    }
  });

  return (
    <MainBig>
      <H2>Create teams</H2>
      <section>
        <ProfileList>
          <li>
            <Image src="" alt="Empty" width={96} height={96} />
            <Dropdown
              isClearable
              id="name"
              name="name"
              value={pokemon}
              className="selectOptions"
              classNamePrefix="select"
              options={pokedex}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              placeholder="Name"
              // onChange={(option) => {
              //   handleFormSelect(option);
              // }}
            />
          </li>
          <li>
            <Image src="" alt="Empty" width={96} height={96} />
            <Dropdown
              isClearable
              id="name"
              name="name"
              value={pokemon}
              className="selectOptions"
              classNamePrefix="select"
              options={pokedex}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              placeholder="Name"
              // onChange={(option) => {
              //   handleFormSelect(option);
              // }}
            />
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ProfileList>
      </section>
    </MainBig>
  );
}

export default Profile;
