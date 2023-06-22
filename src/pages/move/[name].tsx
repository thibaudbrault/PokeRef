import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import BackBtn from '@/components/common/ui/BackBtn';
import { Divider } from '@/components/common/ui/Divider';
import Loader from '@/components/common/ui/Loader/Loader';
import { Heading, Nav, useFetchMove, Data, List } from '@/modules/moves/move';
import { removeDash } from '@/utils';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MoveMainBig } from '@/modules/moves/move/Styled.MoveCard';

const LearnMethod = dynamic(() =>
  import(`@/utils`).then((res) => res.LearnMethod),
);

type Props = {
  name: string;
};

function MoveCard({ name }: Props) {
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

  if (isError) {
    toast.error(`Something went wrong: ${error?.message}`, {
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
      {move && (
        <MoveMainBig>
          <CardTitle>{removeDash(move.name)}</CardTitle>
          <Subtitle>{removeDash(move.generation.name)}</Subtitle>

          <Nav move={move} setVersion={setVersion} />

          <Data move={move} machine={machine} version={version} />

          <Divider />

          <LearnMethod
            toggle={toggle}
            setToggle={setToggle}
            setLearn={setLearn}
          />

          <List
            pokemon={pokemon}
            toggle={toggle}
            status={status}
            moveName={move.name}
            version={version}
          />

          <Link href="/moves" passHref>
            <BackBtn name="Moves" />
          </Link>
        </MoveMainBig>
      )}
    </>
  );
}

export default MoveCard;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
