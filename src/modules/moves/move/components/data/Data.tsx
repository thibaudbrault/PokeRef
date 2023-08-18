import styles from './Data.module.scss';
import { Description } from './description';
import { Effect } from './effect';

import type { IMachine, IMove } from '@/types';

type Props = {
  move: IMove;
  machine?: IMachine[];
  version: string;
};

export function Data({ move, machine, version }: Props) {
  return (
    <section className={styles.section}>
      <Description move={move} machine={machine} version={version} />
      <Effect move={move} version={version} />
    </section>
  );
}
