import React, { useEffect, useMemo, useState } from 'react';
import {
  TableContainer,
  ModifiedTable,
  THead,
  TLink,
  TName,
} from '@/components/common/styles/Table';
import { Sup } from '../Styled.AbilityCard';
import dynamic from 'next/dynamic';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IAbility } from '@/types/Pokemon/Ability';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { ColumnDef } from '@tanstack/react-table';
import { useTableParams } from '@/hooks/useTableParams';

type Props = {
  ability?: IAbility;
  pokedex?: IPokemon[];
};

function TableAbilitycard({ ability, pokedex }: Props) {

  const [filteredPokedex, setFilteredPokedex] = useState([])

  useEffect(() => {
    setFilteredPokedex(
      ability?.pokemon.map(ap =>
        pokedex?.filter(p =>
          p.name === ap.pokemon.name
        )
      )
    )
  }, [])

  const data = useMemo(() => filteredPokedex && [].concat(...filteredPokedex), [filteredPokedex])

  const columns = useMemo<ColumnDef<IPokemon>[]>(
    () => [
      {
        accessorKey: "sprites.front_default",
        id: "sprite",
        header: "Sprite",
        cell: info =>
          <td>
            <ImageWithFallback
              src={info.getValue<string>() || ``}
              alt="-"
              loading="lazy"
              width={64}
              height={64}
              fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
            />
          </td>
      },
      {
        accessorKey: "name",
        id: "sort",
        header: "Name",
        cell: info =>
          <TName>
            <TLink
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: info.getValue<string>() },
              }}
            >
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </TName>
      },
      {
        accessorFn: row => row.abilities[0].ability.name,
        id: "firstAbility",
        header: () => <span>1<Sup>st</Sup> ability</span>,
        cell: info =>
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
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </td>
      },
      {
        accessorFn: row => row.abilities.length > 1 ? (
          row?.abilities?.[1].ability.name
        ) : (
          '-'
        ),
        id: "secondAbility",
        header: () => <span>2<Sup>nd</Sup> ability</span>,
        cell: info =>
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
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </td>
      },
      {
        accessorFn: row => row.abilities.length > 2 ? (
          row?.abilities?.[2].ability.name
        ) : (
          '-'
        ),
        id: "thirdAbility",
        header: () => <span>2<Sup>nd</Sup> ability</span>,
        cell: info =>
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
              {info.getValue<string>().replace(/-/g, ` `)}
            </TLink>
          </td>
      }
    ],
    []
  )

  const { tableContainerRef, tableHeader, tableBody } = useTableParams(
    data,
    columns,
  );

  return (
    <TableContainer ref={tableContainerRef}>
      <ModifiedTable>
        {tableHeader()}
        {tableBody()}
      </ModifiedTable>
    </TableContainer>
  );
}

export default TableAbilitycard;
