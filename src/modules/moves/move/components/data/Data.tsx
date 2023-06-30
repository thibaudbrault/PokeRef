import { IMachine, IMove } from '@/types';
import styles from './Data.module.scss';
import { Description } from './description';
import { Effect } from './effect';

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
