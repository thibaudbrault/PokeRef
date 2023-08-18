import Image from 'next/image';
import { TailSpin } from 'react-loader-spinner';

import styles from './Loader.module.scss';

export function Loader() {
  return (
    <div className={styles.loading}>
      <Image src={`/pokeball.svg`} alt="Loading..." width={192} height={192} />
    </div>
  );
}

export function SmallLoader() {
  return (
    <div className={styles.smallLoading}>
      <Image src={`/pokeball.svg`} alt="Loading..." width={48} height={48} />
    </div>
  );
}

export function Spinner() {
  return (
    <TailSpin
      ariaLabel="loading"
      radius="1"
      wrapperClass={styles.spinner}
      visible={true}
    />
  );
}
