import {
  Capitalize,
  H3,
  H4,
  Subtitle,
} from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import { Divider } from '@/components/common/ui/Divider';
import Loader from '@/components/common/ui/Loader/Loader';
import {
  Description,
  Heading,
  Table,
  useFilterAbility,
} from '@/modules/abilities/ability';
import styles from '@/modules/abilities/ability/Ability.module.scss';
import { removeDash } from '@/utils';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Props = {
  name: string;
};

function Ability({ name }: Props) {
  const overworld = `Overworld`;

  const {
    isLoading,
    isError,
    error,
    ability,
    pokemon,
    filterEffect,
    filterOverworld,
    filterDesc,
  } = useFilterAbility(name);

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

  return (
    <>
      <Heading name={name} />
      <MainBig>
        <h2 className="pageTitle">{ability && removeDash(ability?.name)}</h2>
        <Subtitle>{ability && removeDash(ability?.generation?.name)}</Subtitle>

        <section className={styles.section}>
          <div className={styles.effect}>
            <H3>Effect</H3>
            <p>{filterEffect?.effect}</p>
          </div>
          {filterOverworld && (
            <div className={styles.effect}>
              <H4>Overworld</H4>
              <p>
                {filterOverworld?.effect
                  .slice(filterOverworld.effect.indexOf(overworld))
                  .replace(`Overworld:`, ``)}
              </p>
            </div>
          )}
        </section>
        <Description filterDesc={filterDesc} />
        <Divider />
        <section className={styles.section}>
          <H3>
            Pokemon with{` `}
            <Capitalize>{ability && removeDash(ability?.name)}</Capitalize>
          </H3>
          <Table ability={ability} pokemon={pokemon} />
        </section>
        <Link href="/abilities" passHref>
          <BackBtn name="Abilities" />
        </Link>
      </MainBig>
    </>
  );
}

export default Ability;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
