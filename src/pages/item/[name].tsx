import { FaChevronLeft } from '@meronex/icons/fa';
import { type GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Button, Loader, errorToast } from '@/components';
import {
  Cost,
  Description,
  Fling,
  Heading,
  Held,
  useFilterItem,
} from '@/modules/items/item';
import styles from '@/modules/items/item/Item.module.scss';
import { removeDash } from '@/utils';

type Props = {
  name: string;
};

function ItemCard({ name }: Props) {
  const { isLoading, isError, error, item, filterEffect } = useFilterItem(name);

  if (isError && error instanceof Error) {
    errorToast(error.message);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (item) {
    return (
      <>
        <Heading name={name} />
        <main className="mainBig">
          <h2 className="pageTitle">{removeDash(item?.name)}</h2>
          <h4 className="subtitle">{removeDash(item?.category.name)}</h4>
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
          <Description item={item} />
          <Button intent="back" size="fit" asChild>
            <Link href="/items">
              <FaChevronLeft />
              Back to Items
            </Link>
          </Button>
        </main>
      </>
    );
  }
}

export default ItemCard;

export const config = {
  runtime: `edge`,
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
