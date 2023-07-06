import { IItem } from '@/types';
import { removeDash } from '@/utils';

type Props = {
  item?: IItem;
};

export function Fling({ item }: Props) {
  return (
    <>
      {item?.fling_effect && (
        <p className="fling">
          When the pokémon holds{` `}
          <span className="capitalize">{removeDash(item?.name)}</span> the move
          {` `}
          <i>Fling</i> has {item?.fling_power} power.
          {item?.fling_effect.name &&
            item?.fling_effect.name !== `berry-effect` &&
            item?.fling_effect.name !== `herb-effect` &&
            ` The move will ${item?.fling_effect.name.replace(
              /-/g,
              ` `,
            )} the target.`}
        </p>
      )}
    </>
  );
}
