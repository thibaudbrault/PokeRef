import { FaChevronLeft } from '@meronex/icons/fa';
import * as Tabs from '@radix-ui/react-tabs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Loader, Separator, errorToast } from '@/components';
import { Moves } from '@/modules/moves';
import { Damage, Heading, Pokemon, useTypeQuery } from '@/modules/types/type';
import styles from '@/modules/types/type/Type.module.scss';

function TypeCard() {
  const router = useRouter();
  const name = router.query.name as string;

  const { type, pokemon, moves, isLoading, isError, error } =
    useTypeQuery(name);

  if (isError && error instanceof Error) {
    errorToast(error.message);
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
          <h2 className="title">{type?.name}</h2>
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
        <Button intent="back" size="fit" asChild>
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
