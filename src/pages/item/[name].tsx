import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingItem from '@/components/pages/Items/ItemCard/Heading';
import { useFilterItem } from '@/components/pages/Items/ItemCard/Hooks/useFilterItem';
import {
  ItemCardDataEffect,
  ItemCardDataImage,
  ItemCardDataSection,
} from '@/components/pages/Items/ItemCard/Styled.ItemCard';
import { removeDash } from '@/utils/Typography';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

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

type Props = {
  name: string;
};

function ItemCard({ name }: Props) {
  const { isLoading, isError, error, item, filterEffect } = useFilterItem(name);

  if (isError) {
    return toast.error(`Something went wrong: ${error?.message}`);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (item) {
    return (
      <>
        <HeadingItem name={name} />
        <MainBig>
          <CardTitle>{removeDash(item?.name)}</CardTitle>
          <Subtitle>{removeDash(item?.category.name)}</Subtitle>
          <ItemCardDataSection>
            <div>
              <ItemCardDataEffect>
                <h3>Effect</h3>
                <p>{filterEffect?.effect}</p>
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
}

export default ItemCard;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
