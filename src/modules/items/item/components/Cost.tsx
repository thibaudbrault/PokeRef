import styles from '@/modules/items/item/Item.module.scss';

import type { IItem } from '@/types';

type Props = {
  item?: IItem;
};

export function Cost({ item }: Props) {
  return (
    <>
      {item?.cost !== 0 && (
        <p className={styles.cost}>
          <span>Cost :</span> {item?.cost} Pokédollars
        </p>
      )}
    </>
  );
}
