import { useState } from 'react';

import { FaChevronLeft } from '@meronex/icons/fa';
import * as Tabs from '@radix-ui/react-tabs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Loader, Separator, errorToast } from '@/components';
import { Data, Heading, List, Nav, useFetchMove } from '@/modules/moves/move';
import styles from '@/modules/moves/move/Move.module.scss';
import { removeDash } from '@/utils';

const LearnMethod = dynamic(() =>
  import(`@/utils`).then((res) => res.LearnMethod),
);

function MoveCard() {
  const router = useRouter();
  const name = router.query.name as string;

  const [_learn, setLearn] = useState<string>(`level-up`);

  const {
    move,
    isLoading,
    isError,
    error,
    pokemon,
    status,
    machine,
    version,
    setVersion,
    toggle,
    setToggle,
  } = useFetchMove(name);

  if (isError && error instanceof Error) {
    errorToast(error.message);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Heading name={name} />
      {move && (
        <main className={styles.main}>
          <h2 className="pageTitle">{removeDash(move.name)}</h2>
          <h4 className="subtitle">{removeDash(move.generation.name)}</h4>

          <Nav move={move} setVersion={setVersion} />

          <Data move={move} machine={machine} version={version} />

          <Separator />
          <Tabs.Root className="TabsRootSection" defaultValue={String(toggle)}>
            <LearnMethod setToggle={setToggle} setLearn={setLearn} />
          </Tabs.Root>

          <List
            pokemon={pokemon}
            toggle={toggle}
            status={status}
            moveName={move.name}
            version={version}
          />

          <Button intent="back" size="fit" asChild>
            <Link href="/moves">
              <FaChevronLeft />
              Back to Moves
            </Link>
          </Button>
        </main>
      )}
    </>
  );
}

export default MoveCard;
