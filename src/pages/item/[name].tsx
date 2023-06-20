import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import {
  Cost,
  Desc,
  Fling,
  Held,
} from '@/components/pages/Items/ItemCard/Components';
import HeadingItem from '@/components/pages/Items/ItemCard/Heading';
import { useFilterItem } from '@/components/pages/Items/ItemCard/Hooks/useFilterItem';
import styles from '@/components/pages/Items/ItemCard/ItemCard.module.scss';
import { removeDash } from '@/utils/Typography';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Props = {
  name: string;
};

function ItemCard({ name }: Props) {
  const { isLoading, isError, error, item, filterEffect } = useFilterItem(name);

  if (isError) {
    return toast.error(`Something went wrong: ${error?.message}`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
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
          <section className={styles.section}>
            <div>
              <div className={styles.effect}>
                <h3>Effect</h3>
                <p>{filterEffect?.effect}</p>
              </div>
              <Cost item={item} />
              <Held item={item} />
              <Fling item={item} />
            </div>
            <div className={styles.image}>
              {item && (
                <Image
                  src={item?.sprites?.default}
                  alt={item?.name}
                  width={96}
                  height={96}
                />
              )}
            </div>
          </section>
          <Desc item={item} />
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
