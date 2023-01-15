import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Type } from '@/components/common/styles/Themes';
import { Pokemon } from '@/types/types';

type Props = {
  p: Pokemon.Pokemon;
};

function TypesPokemon({ p }: Props) {
  return p.types?.map((pt) => (
    <Type id={pt.type.name} key={pt.type.name}>
      <Link
        href={{
          pathname: `/type/[name]`,
          query: { name: pt.type.name },
        }}
      >
        <Image alt={pt.type.name} src={``} />
        <span>{pt.type.name}</span>
      </Link>
    </Type>
  ));
}

export default TypesPokemon;
