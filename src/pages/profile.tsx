import { H2 } from '@/components/common/styles/Headings';
import { Dropdown } from '@/components/common/styles/Inputs';
import { MainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import {
  ProfileInputs,
  ProfileList,
} from '@/components/pages/Profile/Styled.Profile';
import { auth, db } from '@/firebase-config';
import { formatOptions, Options } from '@/utils/DataArrays';
import { useFormat } from '@/utils/DataFetch';
import { doc, DocumentData, getDoc } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<DocumentData | undefined>();
  const [formatValue, setFormatValue] = useState<Options>();
  const [formatQuery, setFormatQuery] = useState<string>(`gen9vgc2023`);
  const [pokemon, setPokemon] = useState<Options | null>();

  const team = [];

  const {
    isLoading,
    error,
    data: format,
  } = useFormat(
    `https://raw.githubusercontent.com/pkmn/smogon/main/data/stats/${formatQuery}.json`,
  );

  const getUserDoc = async () => {
    const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
    const docSnap = await getDoc(usersCollectionRef);
    setUser(docSnap.data());
  };

  const setFormat = (option: Options) => {
    setFormatValue(option);
    setFormatQuery(option.value);
    setPokemon(null);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(`/`);
    } else {
      getUserDoc();
    }
  }, [formatValue]);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MainBig>
      <section>
        <H2>Create teams</H2>
        <ProfileInputs>
          <Dropdown
            id="format"
            name="format"
            value={formatValue}
            className="selectOptions"
            classNamePrefix="select"
            options={formatOptions}
            placeholder="Format"
            onChange={(option) => {
              setFormat(option);
            }}
          />
          <Dropdown
            id="pokemon"
            name="pokemon"
            value={pokemon}
            className="selectOptions"
            classNamePrefix="select"
            options={Object.keys(format.pokemon).map((o) => ({
              value: o,
              label: o,
            }))}
            placeholder="Pokemon"
            onChange={(option) => {
              setPokemon(option);
            }}
          />
        </ProfileInputs>
        <ProfileList>
          {format &&
            Object.entries(format?.pokemon)
              .slice(0, 6)
              .map(([key, value]) => (
                <li key={key}>
                  <span>
                    {key} : {(value.usage.weighted * 100).toFixed(2)}%
                  </span>
                </li>
              ))}
        </ProfileList>
      </section>
      <section>
        <H2>{user?.name}'s teams</H2>
      </section>
    </MainBig>
  );
}

export default Profile;
