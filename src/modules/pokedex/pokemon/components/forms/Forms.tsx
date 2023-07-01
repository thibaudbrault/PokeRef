import { Type } from '@/components/common/styles/Themes';
import SmallLoader from '@/components/common/ui/Loader/SmallLoader';
import { useTableParams } from '@/hooks';
import { IPokemon, IPokemonForm } from '@/types';
import { getPokemonForms, removeDash } from '@/utils';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

type Props = {
  pokemon: IPokemon;
};

export function Forms({ pokemon }: Props) {
  const {
    isLoading,
    isError,
    error,
    data: forms,
  }: UseQueryResult<IPokemonForm[], Error> = useQuery({
    queryKey: [`forms`, pokemon],
    queryFn: () => getPokemonForms(pokemon),
  });

  const data = useMemo(
    () => forms?.filter((f: IPokemonForm) => f.form_name !== `unknown`),
    [forms],
  );

  const columns = useMemo<ColumnDef<IPokemonForm>[]>(
    () => [
      {
        accessorKey: `sprites.front_default`,
        id: `sprite`,
        header: `Sprite`,
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
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <td className="tBold">{removeDash(info.getValue<string>())}</td>
        ),
      },
      {
        accessorKey: `is_battle_only`,
        id: `battle`,
        header: `Only in battle`,
        cell: (info) => {
          if (info.getValue<boolean>()) {
            return <td>Yes</td>;
          }
          return <td>No</td>;
        },
      },
      {
        accessorKey: `is_mega`,
        id: `mega`,
        header: `Mega`,
        cell: (info) => {
          if (info.getValue<boolean>()) {
            return <td>Yes</td>;
          }
          return <td>No</td>;
        },
      },
      {
        accessorFn: (row) => row.types[0].type.name,
        id: `type1`,
        header: () => (
          <span>
            1<sup className="sup">st</sup> type
          </span>
        ),
        cell: (info) => (
          <td className="tType">
            <Type id={info.getValue<string>()}>
              <Link
                href={{
                  pathname: `/type/[name]`,
                  query: { name: info.getValue<string>() },
                }}
              >
                <Image
                  src={`/images/types/${info.getValue()}.png` || ``}
                  alt={`-`}
                  width={15}
                  height={15}
                />
                <span>{info.getValue<string>()}</span>
              </Link>
            </Type>
          </td>
        ),
      },
      {
        accessorFn: (row) => row.types.length > 1 && row.types?.[1].type.name,
        id: `type2`,
        header: () => (
          <span>
            2<sup className="sup">nd</sup> type
          </span>
        ),
        cell: (info) => (
          <td className="tType">
            <Type id={info.getValue<string>()}>
              <Link
                href={{
                  pathname: `/type/[name]`,
                  query: { name: info.getValue<string>() },
                }}
              >
                <Image
                  src={`/images/types/${info.getValue()}.png` || ``}
                  alt={`-`}
                  width={15}
                  height={15}
                />
                <span>{info.getValue<string>()}</span>
              </Link>
            </Type>
          </td>
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
    return toast.error(`Something went wrong: ${error.message}`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <section className="section" id="forms">
      <h3 className="h3">Forms</h3>
      <div className="tableContainer" ref={tableContainerRef}>
        <table className="fullWidthTable">
          {tableHeader()}
          {tableBody()}
        </table>
      </div>
    </section>
  );
}
