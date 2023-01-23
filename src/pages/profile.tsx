import React, { useEffect, useState } from 'react';
import { H2 } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { auth, db } from '@/firebase-config';
import { useRouter } from 'next/router';
import Loader from '@/components/common/ui/Loader/Loader';
import { doc, DocumentData, getDoc } from 'firebase/firestore/lite';
import { formatOptions } from '../utils/DataArrays';
import { Dropdown } from '@/components/common/styles/Inputs';
import { useFormat } from '../hooks/DataFetch';
import { ProfileList } from '@/components/pages/Profile/Styled.Profile';

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<DocumentData | undefined>();
  const [formatValue, setFormatValue] = useState();
  const [formatQuery, setFormatQuery] = useState(`gen9vgc2023`);

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

  const setValue = (option) => {
    setFormatValue(option);
    setFormatQuery(option.value);
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

  console.log(format);

  return (
    <MainBig>
      <section>
        <H2>Create teams</H2>
        <Dropdown
          id="name"
          name="name"
          defaultInputValue={`gen9vgc2023`}
          value={formatValue}
          className="selectOptions"
          classNamePrefix="select"
          options={formatOptions}
          placeholder="Format"
          onChange={(option) => {
            setValue(option);
          }}
        />
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
