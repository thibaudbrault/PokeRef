import { H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import {
  FullWidthTable,
  TableContainer,
  TBold,
  TType,
} from '@/components/common/styles/Table';
import { Type } from '@/components/common/styles/Themes';
import SmallLoader from '@/components/common/ui/Loader/SmallLoader';
import { Sup } from '@/components/pages/Abilities/AbilityCard/Styled.AbilityCard';
import { useTableParams } from '@/hooks/useTableParams';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonForm } from '@/types/Pokemon/PokemonForm';
import { getPokemonForms } from '@/utils/DataFetch';
import { removeDash } from '@/utils/Typography';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

type Props = {
  pokemon: IPokemon;
};

function Forms({ pokemon }: Props) {
  const {
    isLoading,
    isError,
    error,
    data: forms,
  } = useQuery({
    queryKey: ['forms'],
    queryFn: () => getPokemonForms(pokemon),
  });

  const data = useMemo(
    () => forms?.filter((f: IPokemonForm) => f.form_name !== 'unknown'),
    [forms],
  );

  const columns = useMemo<ColumnDef<IPokemonForm>[]>(
    () => [
      {
        accessorKey: 'sprites.front_default',
        id: 'sprite',
        header: 'Sprite',
        cell: (info) => (
          <td>
            <Image
              src={info.getValue<string>() || ``}
              alt="-"
              width={96}
              height={96}
            />
          </td>
        ),
      },
      {
        accessorFn: (row) => row.form_name,
        id: 'sort',
        header: 'Name',
        cell: (info) => <TBold>{removeDash(info.getValue<string>())}</TBold>,
      },
      {
        accessorKey: 'is_battle_only',
        id: 'battle',
        header: 'Only in battle',
        cell: (info) => {
          if (info.getValue<boolean>()) {
            return <td>Yes</td>;
          }
          return <td>No</td>;
        },
      },
      {
        accessorKey: 'is_mega',
        id: 'mega',
        header: 'Mega',
        cell: (info) => {
          if (info.getValue<boolean>()) {
            return <td>Yes</td>;
          }
          return <td>No</td>;
        },
      },
      {
        accessorFn: (row) => row.types[0].type.name,
        id: 'type1',
        header: () => (
          <span>
            1<Sup>st</Sup> type
          </span>
        ),
        cell: (info) => (
          <TType>
            <Type id={info.getValue<string>()}>
              <Link
                href={{
                  pathname: `/type/[name]`,
                  query: { name: info.getValue<string>() },
                }}
              >
                <Image
                  src={
                    `https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${info.getValue()}.png` ||
                    ''
                  }
                  alt={'-'}
                  width={15}
                  height={15}
                />
                <span>{info.getValue<string>()}</span>
              </Link>
            </Type>
          </TType>
        ),
      },
      {
        accessorFn: (row) => row.types.length > 1 && row.types?.[1].type.name,
        id: 'type2',
        header: () => (
          <span>
            2<Sup>nd</Sup> type
          </span>
        ),
        cell: (info) => (
          <TType>
            <Type id={info.getValue<string>()}>
              <Link
                href={{
                  pathname: `/type/[name]`,
                  query: { name: info.getValue<string>() },
                }}
              >
                <Image
                  src={
                    `https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${info.getValue()}.png` ||
                    ''
                  }
                  alt={'-'}
                  width={15}
                  height={15}
                />
                <span>{info.getValue<string>()}</span>
              </Link>
            </Type>
          </TType>
        ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  if (isError) {
    return toast.error(`Something went wrong: ${error.message}`);
  }

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <Section>
      <H3>Forms</H3>
      <TableContainer ref={tableContainerRef}>
        <FullWidthTable>
          {tableHeader()}
          {tableBody()}
        </FullWidthTable>
      </TableContainer>
    </Section>
  );
}

export default Forms;