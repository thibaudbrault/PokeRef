// @ts-nocheck

import { H2 } from '@/components/common/styles/Headings';
import { Dropdown } from '@/components/common/styles/Inputs';
import { MainBig, Section } from '@/components/common/styles/Sizing';
import { TableContainer, TBold } from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import { LocationTable } from '@/components/pages/Locations/Styled.Locations';
import { ProfileList } from '@/components/pages/Profile/Styled.Profile';
import { auth, db } from '@/firebase-config';
import { useTableParams } from '@/hooks/useTableParams';
import { IPokemonFormat } from '@/types/Profile/Stats';
import { formatOptions, IOptions } from '@/utils/DataArrays';
import { getFormat } from '@/utils/DataFetch';
import { useQueries } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { doc, DocumentData, getDoc } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { SingleValue } from 'react-select';

type objType = {
  key: string;
  value: IPokemonFormat;
}

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<DocumentData | undefined>();
  const [formatValue, setFormatValue] = useState<IOptions | null>(null);
  const [formatQuery, setFormatQuery] = useState<string>(`gen9vgc2023`);
  const [pokemon, setPokemon] = useState<IOptions | null>(null);

  const team = [];

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
      }
    ]
  })

  const data = useMemo(() => stats.data && Object.entries(stats.data.pokemon).map(([name, value]) => Object.assign({ name }, value)), [stats.data])

  const columns = useMemo<ColumnDef<IPokemonFormat>[]>(
    () => [
      {
        accessorKey: `name`,
        id: `name`,
        header: `Name`,
        cell: (info) => <TBold>{info.getValue<string>()}</TBold>,
      },
      {
        accessorKey: `usage.weighted`,
        id: `sortInv`,
        header: `Usage`,
        cell: (info) => <td>{((info.getValue<number>()) * 100).toFixed(2)}%</td>,
      },
      {
        accessorFn: (row) => Object.entries(row.abilities).flat(),
        id: `abilities`,
        header: `Abilities`,
        enableSorting: false,
        cell: (info) =>
          <td>
            <p>{info.getValue<(string | number)[]>()[0]} - {(info.getValue<number[]>()[1] * 100).toFixed(2)}%</p>
            {info.getValue<(string | number)[]>().length > 2 &&
              <p>{info.getValue<(string | number)[]>()[2]} - {(info.getValue<number[]>()[3] * 100).toFixed(2)}%</p>
            }
          </td>
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  const getUserDoc = async () => {
    if (auth.currentUser) {
      const usersCollectionRef = doc(db, `users`, auth.currentUser.uid);
      const docSnap = await getDoc(usersCollectionRef);
      setUser(docSnap.data());
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
    }
  }, [formatValue]);

  if (stats.status === 'error' || analyses.status === 'error') {
    return toast.error(`Something went wrong`);
  }

  if (stats.status === 'loading' || analyses.status === 'loading') {
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
            Object.entries(stats.data.pokemon)
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
      <Section>
        <TableContainer ref={tableContainerRef}>
          <LocationTable>
            {tableHeader()}
            {tableBody()}
          </LocationTable>
        </TableContainer>
      </Section>
      <section>
        <H2>{user?.name}'s teams</H2>
      </section>
    </MainBig >
  );
}

export default Profile;
