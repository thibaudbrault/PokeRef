import { Dropdown } from '@/components/common/styles/Inputs';
import {
  FullWidthTable,
  TBold,
  TLink,
  TType,
  TableContainer,
} from '@/components/common/styles/Table';
import { Type } from '@/components/common/styles/Themes';
import { useTableParams } from '@/hooks';
import styles from '@/modules/types/type/Type.module.scss';
import { IPokemon } from '@/types';
import { IOptionsFixed, removeDash, typeOptions } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';

type Props = {
  typeName?: string;
  pokemon?: IPokemon[];
};

export function Pokemon({ typeName, pokemon }: Props) {
  const [type, setType] = useState<IOptionsFixed[]>([]);
  const [typeArray, setTypeArray] = useState<IOptionsFixed[]>(typeOptions);

  const fixCurType = useCallback(
    (name: string, isFixed: boolean) => {
      return setTypeArray(
        typeArray.map((t) => {
          if (t.value === name) {
            return { ...t, isFixed };
          } else {
            return t;
          }
        }),
      );
    },
    [typeArray],
  );

  const data = useMemo(
    () => pokemon && pokemon.length > 0 && pokemon.filter((p) => p.id < 10000),
    [pokemon],
  );

  const columns = useMemo<ColumnDef<IPokemon>[]>(
    () => [
      {
        accessorKey: `sprites.front_default`,
        id: `sprite`,
        header: `Sprites`,
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
        accessorKey: `name`,
        id: `sort`,
        header: `Name`,
        cell: (info) => (
          <TBold>
            <TLink
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </TBold>
        ),
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
          <TType>
            <Type id={info.getValue<string>()}>
              <Link
                href={{
                  pathname: `/type/[name]`,
                  query: { name: info.getValue<string>() },
                }}
              >
                <Image
                  src={`/images/types/${info.getValue()}.png`}
                  alt={info.getValue<string>()}
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
        id: `type2`,
        header: () => (
          <span>
            2<sup className="sup">nd</sup> type
          </span>
        ),
        cell: (info) =>
          info.getValue() ? (
            <TType>
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
            </TType>
          ) : (
            <td>-</td>
          ),
      },
    ],
    [],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  const dropdownStyles = {
    // @ts-ignore
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: `none` } : base;
    },
  };

  useEffect(() => {
    if (typeName) {
      fixCurType(typeName, true);
    }
  }, [typeName]);

  return (
    <section className="section">
      <h3 className="h3">Pokémon</h3>
      <div className={styles.container}>
        {data && (
          <h4 className={styles.subtitle}>
            {data.length} Pokémon are{` `}
            <span className="capitalize">{typeName}</span> type
          </h4>
        )}
        <Select
          value={type}
          defaultValue={typeArray.some((t) => t.isFixed)}
          isMulti
          isClearable={typeArray.some((t) => !t.isFixed)}
          isSearchable={false}
          styles={dropdownStyles}
          name="type"
          id="type"
          className="dropdown selectOptions"
          classNamePrefix="select"
          options={typeArray}
          placeholder="Select"
          // @ts-ignore
          components={
            type &&
            type?.length >= 2 && {
              Menu: () => null,
              MenuList: () => null,
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }
          }
          onChange={(option) => option && setType(option as IOptionsFixed[])}
        />
      </div>
      <TableContainer ref={tableContainerRef}>
        {data && data.length > 0 && (
          <FullWidthTable>
            {tableHeader()}
            {tableBody()}
          </FullWidthTable>
        )}
      </TableContainer>
    </section>
  );
}
