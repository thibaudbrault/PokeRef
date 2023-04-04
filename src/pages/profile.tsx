import { H2 } from '@/components/common/styles/Headings';
import { Dropdown } from '@/components/common/styles/Inputs';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import {
  ProfileCaught,
  ProfileList,
} from '@/components/pages/Profile/Styled.Profile';
import { auth, db } from '@/firebase-config';
import { formatOptions, IOptions } from '@/utils/DataArrays';
import { getFormat } from '@/utils/DataFetch';
import { capitalize, removeDash } from '@/utils/Typography';
import { useQueries } from '@tanstack/react-query';
import {
  arrayRemove,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SingleValue } from 'react-select';

export type entryOf<o> = {
  [k in keyof o]-?: [k, Exclude<o[k], undefined>];
}[o extends readonly unknown[] ? keyof o & number : keyof o] &
  unknown;

export type entriesOf<o extends object> = entryOf<o>[] & unknown;

export const entriesOf = <o extends object>(o: o) =>
  Object.entries(o) as entriesOf<o>;

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<DocumentData | undefined>();
  const [formatValue, setFormatValue] = useState<IOptions | null>(null);
  const [formatQuery, setFormatQuery] = useState<string>(`gen9vgc2023`);
  const [pokemon, setPokemon] = useState<IOptions | null>(null);

  const [stats, analyses] = useQueries({
    queries: [
      {
        queryKey: [`stats`, formatQuery],
        queryFn: () =>
          getFormat(
            `https://raw.githubusercontent.com/pkmn/smogon/main/data/stats/${formatQuery}.json`,
          ),
      },
      {
        queryKey: [`analyses`, formatQuery],
        queryFn: () =>
          getFormat(
            `https://raw.githubusercontent.com/pkmn/smogon/main/data/analyses/${formatQuery}.json`,
          ),
      },
    ],
  });

  const getUserDoc = async () => {
    if (auth.currentUser) {
      const usersCollectionRef = doc(db, `users`, auth.currentUser.uid);
      const docSnap = await getDoc(usersCollectionRef);
      setUser(docSnap.data());
    }
  };

  const releaseHandler = async (name: string, img: string) => {
    if (auth.currentUser) {
      try {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await updateDoc(usersCollectionRef, {
          caught: arrayRemove({
            0: name,
            1: img,
          }),
        });
        toast.success(`You released ${capitalize(name)}`, {
          style: {
            fontSize: `1.7rem`,
          },
        });
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, {
            style: {
              fontSize: `1.7rem`,
            },
          });
        }
      }
    }
  };

  const deleteAccount = async () => {
    if (auth.currentUser) {
      try {
        const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
        await deleteDoc(usersCollectionRef);
        await auth.currentUser.delete();
        toast.success(`Congrats 🎉! Your account is now created`, {
          style: {
            fontSize: `1.7rem`,
          },
        });
        router.push(`/`);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message, {
            style: {
              fontSize: `1.7rem`,
            },
          });
        }
      }
    }
  };

  const setFormat = (option: SingleValue<IOptions>) => {
    if (option) {
      setFormatValue(option);
      setFormatQuery(option.value);
      setPokemon(null);
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      router.push(`/`);
    } else {
      getUserDoc();
      const usersCollectionRef = doc(db, `users`, auth.currentUser?.uid);
      const unsubscribe = onSnapshot(usersCollectionRef, (doc) => {
        setUser(doc.data());
      });
      return () => {
        unsubscribe();
      };
    }
  }, [formatValue]);

  if (stats.status === `error` || analyses.status === `error`) {
    return toast.error(`Something went wrong`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (stats.status === `loading` || analyses.status === `loading` || !user) {
    return <Loader />;
  }

  return (
    <MainBig>
      <Section>
        <H2>Create teams</H2>
        <Dropdown
          id="format"
          name="format"
          value={formatValue}
          className="selectOptions"
          classNamePrefix="select"
          options={formatOptions}
          placeholder="Format"
          onChange={(option) => {
            setFormat(option as IOptions);
          }}
        />
        <ProfileList>
          {stats &&
            entriesOf(stats.data.pokemon)
              .slice(0, 6)
              .map(([key, value]) => (
                <li key={key}>
                  <span>
                    {key} : {(value.usage.weighted * 100).toFixed(2)}%
                  </span>
                </li>
              ))}
        </ProfileList>
      </Section>
      <section>
        <H2>{user?.name}'s caught pokémon</H2>
        <ProfileCaught>
          {user?.caught.map((p: string[]) => (
            <li>
              <Image src={p[1]} alt="" width={96} height={96} />
              <Link
                href={{
                  pathname: `/pokemon/[name]`,
                  query: { name: p[0] },
                }}
              >
                {removeDash(p[0])}
              </Link>
              <button onClick={() => releaseHandler(p[0], p[1])}>
                Release
              </button>
            </li>
          ))}
        </ProfileCaught>
      </section>
    </MainBig>
  );
}

export default Profile;
