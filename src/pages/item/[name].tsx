import LinkButton from '@/components/Button/Button';
import { Loader } from '@/components/Loader/Loader';
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
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
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
          <LinkButton
            href="/items"
            className="back"
            title="Back to Items"
            icon
          />
        </main>
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
