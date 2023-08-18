import Image from 'next/image';
import Link from 'next/link';

import type { IPokemon } from '@/types';

type Props = {
  p: IPokemon;
};

export function Types({ p }: Props) {
  return (
    <>
      {p.types?.map((pt) => (
        <div key={pt.type.name} className="type" id={pt.type.name}>
          <Link
            href={{
              pathname: `/type/[name]`,
              query: { name: pt.type.name },
            }}
          >
            <Image
              src={`/images/types/${pt.type.name}.png`}
              alt={pt.type.name}
              width={20}
              height={20}
            />
            <span>{pt.type.name}</span>
          </Link>
        </div>
      ))}
    </>
  );
}
