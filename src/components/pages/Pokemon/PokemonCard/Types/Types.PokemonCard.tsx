import { H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import { Type } from '@/components/common/styles/Themes';
import { IType } from '@/types/Pokemon/Type';
import Image from 'next/image';
import Link from 'next/link';

import { PokemonTypesList } from './Styled.Types.PokemonCard';
import TableTyping from './Table/Table.Types.PokemonCard';

type Props = {
  types: IType[];
};

function Typing({ types }: Props) {
  return (
    <Section id="types">
      <H3>Types relations</H3>
      <PokemonTypesList>
        {types.map((t) => (
          <Type id={t.name} key={t.name}>
            <Link
              href={{
                pathname: `/type/[name]`,
                query: { name: t.name },
              }}
            >
              <Image
                src={`/images/types/${t.name}.png`}
                alt={t.name}
                width={30}
                height={30}
              />
              <span>{t.name}</span>
            </Link>
          </Type>
        ))}
      </PokemonTypesList>
      <div>
        <TableTyping types={types} />
      </div>
    </Section>
  );
}

export default Typing;
