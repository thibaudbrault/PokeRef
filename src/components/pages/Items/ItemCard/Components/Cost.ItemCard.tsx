import styles from '@/components/pages/Items/ItemCard/ItemCard.module.scss';
import { IItem } from '@/types/Items/Item';

type Props = {
  item?: IItem;
};

function CostItemCard({ item }: Props) {
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

export default CostItemCard;
