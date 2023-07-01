import { Type } from '@/components/common/styles/Themes';
import { IType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Table } from './Table';
import styles from './Types.module.scss';

type Props = {
  types: IType[];
};

export function Types({ types }: Props) {
  return (
    <section className="section" id="types">
      <h3 className="h3">Types relations</h3>
      <div className={styles.typesList}>
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
      </div>
      <div>
        <Table types={types} />
      </div>
    </section>
  );
}
