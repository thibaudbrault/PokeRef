import React from 'react';
import { TRow, TName, TLink } from '@/components/common/styles/Table';
import { Machines } from '@/types/types';

type Props = {
  filterMachines: Machines.Machines[];
  version: string;
};

function ListMachines({ filterMachines, version }: Props) {
  return (
    <>
      {filterMachines?.map(
        (ma) =>
          ma.version_group.name === version && (
            <TRow key={ma.item.name}>
              <TName>{ma.item.name.toUpperCase()}</TName>
              <td>
                <TLink
                  href={{
                    pathname: `/move/[name]`,
                    query: { name: ma.move.name },
                  }}
                  key={ma.move.name}
                  passHref
                >
                  {ma.move.name.replace(/-/g, ` `)}
                </TLink>
              </td>
            </TRow>
          ),
      )}
    </>
  );
}

export default ListMachines;
