import { Capitalize } from '@/components/common/styles/Headings';
import { Items } from '@/types/types';
import { removeDash } from '@/utils/Typography';
import { ItemCardDataFling } from '../Styled.ItemCard';

type Props = {
  item?: Items.Items;
};

function FlingItemCard({ item }: Props) {
  return (
    <>
      {item?.fling_effect && (
        <ItemCardDataFling>
          When the pokémon holds{` `}
          <Capitalize>{removeDash(item?.name)}</Capitalize> the move{` `}
          <i>Fling</i> has {item?.fling_power} power.
          {item?.fling_effect.name &&
            item?.fling_effect.name !== `berry-effect` &&
            item?.fling_effect.name !== `herb-effect` &&
            ` The move will ${item?.fling_effect.name.replace(
              /-/g,
              ` `,
            )} the target.`}
        </ItemCardDataFling>
      )}
    </>
  );
}

export default FlingItemCard;
