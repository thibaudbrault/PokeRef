import React from 'react';
import { MainBig } from '@/components/common/styles/Sizing';
import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import {
  ItemCardDataEffect,
  ItemCardDataImage,
  ItemCardDataSection,
} from '@/components/pages/Items/ItemCard/Styled.ItemCard';
import Loader from '@/components/common/ui/Loader/Loader';
import Link from 'next/link';
import Image from 'next/image';
import BackBtn from '@/components/common/ui/BackBtn';
import HeadingItem from '@/components/pages/Items/ItemCard/Heading';
import { useFilterItem } from '@/components/pages/Items/ItemCard/Hooks/useFilterItem';
import dynamic from 'next/dynamic';
import { useRouterIsReady } from '@/hooks/useRouterIsReady';

const DescItemcard = dynamic(
  () => import(`@/components/pages/Items/ItemCard/Components/Desc.Itemcard`),
);
const FlingItemCard = dynamic(
  () => import(`@/components/pages/Items/ItemCard/Components/Fling.ItemCard`),
);
const HeldItemcard = dynamic(
  () => import(`@/components/pages/Items/ItemCard/Components/Held.Itemcard`),
);
const CostItemCard = dynamic(
  () => import(`@/components/pages/Items/ItemCard/Components/Cost.ItemCard`),
);

function ItemCard() {
  const { name } = useRouterIsReady();

  const { isLoading, error, item, filterEffect } = useFilterItem(name);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingItem name={name} />
      <MainBig>
        <CardTitle>{item?.name.replace(/-/g, ` `)}</CardTitle>
        <Subtitle>{item?.category.name.replace(/-/g, ` `)}</Subtitle>
        <ItemCardDataSection>
          <div>
            <ItemCardDataEffect>
              <h3>Effect</h3>
              <p key={filterEffect?.short_effect}>
                {filterEffect?.short_effect}
              </p>
            </ItemCardDataEffect>
            <CostItemCard item={item} />
            <HeldItemcard item={item} />
            <FlingItemCard item={item} />
          </div>
          <ItemCardDataImage>
            {item && (
              <Image
                src={item?.sprites?.default}
                alt={item?.name}
                width={96}
                height={96}
              />
            )}
          </ItemCardDataImage>
        </ItemCardDataSection>
        <DescItemcard item={item} />
        <Link href="/items" passHref>
          <BackBtn name="Items" />
        </Link>
      </MainBig>
    </>
  );
}

export default ItemCard;
