import styles from './Separator.module.scss';
import * as RadixSeparator from '@radix-ui/react-separator';

export function Separator() {
  return <RadixSeparator.Root className={styles.separator} />;
}
