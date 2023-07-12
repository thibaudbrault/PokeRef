import { FaChevronLeft } from '@meronex/icons/fa';
import * as Tabs from '@radix-ui/react-tabs';
import { type GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Button, ErrorToast, Loader, Separator } from '@/components';
import { Moves } from '@/modules/moves';
import { Damage, Heading, Pokemon, useTypeQuery } from '@/modules/types/type';
import styles from '@/modules/types/type/Type.module.scss';

type Props = {
  name: string;
};

function TypeCard({ name }: Props) {
  const { type, pokemon, moves, isLoading, isError, error } =
    useTypeQuery(name);

  if (isError) {
    return <ErrorToast error={error} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading name={name} />
      <main className="mainBig">
        <div className={styles.title}>
          <Image
            src={`/images/types/${name}.png`}
            alt=""
            width={96}
            height={96}
          />
          <h2 className="pageTitle">{type?.name}</h2>
        </div>
        <Damage type={type} />
        <Separator />
        <Tabs.Root className="TabsRootSection" defaultValue="tab1">
          <Tabs.List
            className="TabsList"
            aria-label="Switch between pokémon and moves"
          >
            <Tabs.Trigger value="tab1" className="TabsTrigger">
              Pokémon
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" className="TabsTrigger">
              Moves
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <Pokemon typeName={type?.name} pokemon={pokemon} />
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <Moves moves={moves} />
          </Tabs.Content>
        </Tabs.Root>
        <Button intent="back" asChild>
          <Link href="/types">
            <FaChevronLeft />
            Back to Types
          </Link>
        </Button>
      </main>
    </>
  );
}

export default TypeCard;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
