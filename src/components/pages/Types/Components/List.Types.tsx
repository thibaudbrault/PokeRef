import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Types } from '@/types/types';
import { ModifiedType } from '@/components/pages/Types/Styled.Types';

type Props = {
  types?: Types.Types[];
};

function ListTypes({ types }: Props) {
  return (
    <>
      {types?.map((t: Types.Types) => (
        <li key={t.name}>
          <ModifiedType id={t.name}>
            <Link
              href={{ pathname: `/type/[name]`, query: { name: t?.name } }}
              key={t.name}
            >
              <Image alt={t.name} src={``} />
              <h2>{t.name}</h2>
            </Link>
          </ModifiedType>
        </li>
      ))}
    </>
  );
}

export default ListTypes;
