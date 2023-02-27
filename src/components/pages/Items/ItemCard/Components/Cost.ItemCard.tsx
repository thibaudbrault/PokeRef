import { IItem } from '@/types/Items/Item';
import { ItemCardDataCost } from '../Styled.ItemCard';

type Props = {
  item?: IItem;
};

function CostItemCard({ item }: Props) {
  return (
    <>
      {item?.cost !== 0 && (
        <ItemCardDataCost>
          <span>Cost :</span> {item?.cost} Pokédollars
        </ItemCardDataCost>
      )}
    </>
  );
}

export default CostItemCard;
