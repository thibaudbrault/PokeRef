import { Capitalize, H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import {
  TableContainer,
  TBold,
  TLink,
  TType,
} from '@/components/common/styles/Table';
import { Type } from '@/components/common/styles/Themes';
import Loader from '@/components/common/ui/Loader/Loader';
import { Sup } from '@/components/pages/Abilities/AbilityCard/Styled.AbilityCard';
import { useTableParams } from '@/hooks/useTableParams';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { removeDash } from '@/utils/Typography';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { TypeListSubtitle, TypeMovesTable } from '../Styled.TypeCard';

type Props = {
  typeName?: string;
  pokemon?: IPokemon[];
};

function PokemonType({ typeName, pokemon }: Props) {
  if (!typeName || !pokemon?.length) {
    return <Loader />;
  }

  const data = useMemo(() => pokemon.filter((p) => p.id < 10000), [pokemon]);

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
                  src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${info.getValue()}.png`}
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
            2<Sup>nd</Sup> type
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
                    src={
                      `https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${info.getValue()}.png` ||
                      ``
                    }
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

  return (
    <Section>
      <H3>Pokémon</H3>
      <TypeListSubtitle>
        {data.length} Pokémon are <Capitalize>{typeName}</Capitalize> type
      </TypeListSubtitle>
      <TableContainer ref={tableContainerRef}>
        {data.length > 0 && (
          <TypeMovesTable>
            {tableHeader()}
            {tableBody()}
          </TypeMovesTable>
        )}
      </TableContainer>
    </Section>
  );
}

export default PokemonType;
