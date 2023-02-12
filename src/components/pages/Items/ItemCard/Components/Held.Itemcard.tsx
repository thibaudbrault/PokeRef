import { Items } from '@/types/types';
import { removeDash } from '@/utils/Typography';
import Link from 'next/link';
import { ItemCardDataHeld } from '../Styled.ItemCard';

type Props = {
  item?: Items.Items;
};

function HeldItemcard({ item }: Props) {
  return (
    <>
      {item?.held_by_pokemon.length !== 0 && (
        <ItemCardDataHeld>
          <span>Held by :</span>
          {item?.held_by_pokemon?.map((ih: Items.Held) => (
            <Link
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: ih.pokemon.name },
              }}
              key={ih.pokemon.name}
            >
              {removeDash(ih.pokemon.name)}
            </Link>
          ))}
        </ItemCardDataHeld>
      )}
    </>
  );
}

export default HeldItemcard;
