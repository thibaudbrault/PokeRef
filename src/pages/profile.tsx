import React, { useEffect, useState } from 'react';
import { H2 } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import { auth, db } from '@/firebase-config';
import { useRouter } from 'next/router';
import { usePokedex } from '@/hooks/DataFetch';
import Loader from '@/components/common/ui/Loader/Loader';
import { doc, DocumentData, getDoc } from 'firebase/firestore/lite';
import axios from 'axios';
import Select from 'react-select';
import { formatOptions } from '../utils/DataArrays';
import { Dropdown } from '@/components/common/styles/Inputs';

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<DocumentData | undefined>()
  const [test, setTest] = useState([])

  let team = []

  const {
    isLoading,
    error,
    data: pokedex,
  } = usePokedex(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1008`);

  const getUserDoc = async () => {
    const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
    const docSnap = await getDoc(usersCollectionRef)
    setUser(docSnap.data())
  }

  const getTest = async () => {
    try {
      const res = await axios.get(`https://raw.githubusercontent.com/pkmn/smogon/main/data/stats/${testValue}.json`)
      setTest(res.data.pokemon)
      console.log(res.data.pokemon)
    } catch (err) {
      console.error(err)
    }
  }

  const testArr = [
    { name: 'gen9vgc2023' },
    { name: 'gen9uu' },
  ]

  const setValue = (option) => {
    setTestValue(option.value)
  }

  const [testValue, setTestValue] = useState('gen9vgc2023')
  console.log(testValue)

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(`/`);
    }
    getUserDoc();
    getTest();
  }, [testValue]);

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
        <Dropdown
          id="name"
          name="name"
          value={test}
          className="selectOptions"
          classNamePrefix="select"
          options={formatOptions}
          placeholder="Name"
          onChange={(option) => {
            console.log(option)
            setValue(option);
          }}
        />
        <div>
          {Object.entries(test).map(([key, value]) => (
            <li className="travelcompany-input">
              <span className="input-label">
                {key} : {value.count}
              </span>
            </li>
          ))}
        </div>
      </section>
      <section>
        <H2>{user?.name}'s teams</H2>
      </section>
    </MainBig>
  );
}

export default Profile;
