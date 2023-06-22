import {
  FullWidthTable,
  TableContainer,
  TBold,
  TLink,
} from '@/components/common/styles/Table';
import { useTableParams } from '@/hooks';
import { IAbility, IPokemon } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import styles from '@/components/pages/Abilities/AbilityCard/AbilityCard.module.scss';
import { ImageWithFallback, removeDash } from '@/utils';

type Props = {
  ability?: IAbility;
  pokemon?: IPokemon[];
};

export function Table({ ability, pokemon }: Props) {
  const data = useMemo(
    () => pokemon && pokemon.length > 0 && pokemon,
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
            <ImageWithFallback
              src={info.getValue<string>() || ``}
              alt="-"
              width={96}
              height={96}
              fallbackSrc={`/images/other/unknown.png`}
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
        accessorFn: (row) => row.abilities[0].ability.name,
        id: `firstAbility`,
        header: () => (
          <span>
            1<sup className={styles.sup}>st</sup> ability
          </span>
        ),
        cell: (info) => (
          <td>
            <TLink
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
              className={
                info.getValue<string>() === ability?.name ? `bold` : ``
              }
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </td>
        ),
      },
      {
        accessorFn: (row) =>
          row.abilities.length > 1 ? row?.abilities?.[1].ability.name : `-`,
        id: `secondAbility`,
        header: () => (
          <span>
            2<sup className={styles.sup}>nd</sup> ability
          </span>
        ),
        cell: (info) => (
          <td>
            <TLink
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
              className={
                info.getValue<string>() === ability?.name ? `bold` : ``
              }
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </td>
        ),
      },
      {
        accessorFn: (row) =>
          row.abilities.length > 2 ? row?.abilities?.[2].ability.name : `-`,
        id: `thirdAbility`,
        header: () => <span>hidden ability</span>,
        cell: (info) => (
          <td>
            <TLink
              href={{
                pathname: `/ability/[name]`,
                query: { name: info.getValue<string>() },
              }}
              className={
                info.getValue<string>() === ability?.name ? `bold` : ``
              }
            >
              {removeDash(info.getValue<string>())}
            </TLink>
          </td>
        ),
      },
    ],
    [ability?.name],
  );

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  return (
    <TableContainer ref={tableContainerRef}>
      <FullWidthTable>
        {tableHeader()}
        {tableBody()}
      </FullWidthTable>
    </TableContainer>
  );
}
