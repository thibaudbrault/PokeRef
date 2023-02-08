import { ModifiedType } from '@/components/pages/Types/Styled.Types';
import { Types } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

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
              <Image
                src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${t.name}.png`}
                alt={t.name}
                width={50}
                height={50}
              />
              <h2>{t.name}</h2>
            </Link>
          </ModifiedType>
        </li>
      ))}
    </>
  );
}

export default ListTypes;
