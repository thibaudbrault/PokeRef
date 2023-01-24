import React from 'react';
import Image from 'next/image';
import { TLink, TRow } from '@/components/common/styles/Table';
import { Items } from '@/types/types';
import { TCategoryItems, TEffectItems, TNameItems } from '../Styled.Items';

type Props = {
  filterItems?: Items.Items[];
};

function ListItems({ filterItems }: Props) {
  function itemsToHide(i: Items.Items) {
    return (
      i.category.name !== `dynamax-crystals` &&
      i.category.name !== `all-machines` &&
      i.category.name !== `all-mail` &&
      i.category.name !== `unused` &&
      i.category.name !== `data-cards` &&
      i.category.name !== `plot-advancement` &&
      i.category.name !== `species-candies` &&
      i.category.name !== `gameplay`
    );
  }

  return (
    <tbody>
      {filterItems?.map(
        (i: Items.Items) =>
          itemsToHide(i) && (
            <TRow key={i.name}>
              <TNameItems>
                <div>
                  {i.sprites.default && (
                    <Image
                      src={i.sprites.default}
                      alt=""
                      width={30}
                      height={30}
                    />
                  )}
                  <TLink
                    href={{
                      pathname: `/item/[name]`,
                      query: { name: i.name },
                    }}
                    key={i.name}
                  >
                    {i.name.replace(/-/g, ` `)}
                  </TLink>
                </div>
              </TNameItems>
              <TCategoryItems>
                {i.category.name.replace(/-/g, ` `)}
              </TCategoryItems>
              <TEffectItems>
                {i.effect_entries.length ? (
                  i.effect_entries?.map((ie) => (
                    <span key={ie.short_effect}>{ie.short_effect}</span>
                  ))
                ) : (
                  <span className="unavailable">No description available</span>
                )}
              </TEffectItems>
            </TRow>
          ),
      )}
    </tbody>
  );
}

export default ListItems;
