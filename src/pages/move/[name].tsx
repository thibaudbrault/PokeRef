import React, { useState } from 'react';
import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import Loader from '@/components/common/ui/Loader/Loader';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import BackBtn from '@/components/common/ui/BackBtn';
import List from '@/components/pages/Moves/MoveCard/List/List.MoveCard';
import HeadingMove from '@/components/pages/Moves/MoveCard/Heading';
import { useFetchMove } from '@/components/pages/Moves/MoveCard/Hooks/useFetchMove';
import { MoveMainBig } from '@/components/pages/Moves/MoveCard/Styled.MoveCard';
import { GetServerSidePropsContext } from 'next';

const Nav = dynamic(
  () => import(`@/components/pages/Moves/MoveCard/Nav/Nav.MoveCard`),
);
const Data = dynamic(
  () => import(`@/components/pages/Moves/MoveCard/Data/Data.MoveCard`),
);
const LearnMethod = dynamic(() =>
  import(`@/utils/ObjectsMap`).then((res) => res.LearnMethod),
);

type Props = {
  name: string;
}

function MoveCard({ name }: Props) {
  const [learn, setLearn] = useState<string>(`level-up`);

  const {
    isLoading,
    error,
    move,
    pokedex,
    machines,
    version,
    setVersion,
    toggle,
    setToggle,
  } = useFetchMove(name);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingMove name={name} />
      {move && (
        <MoveMainBig>
          <CardTitle>{move?.name?.replace(/-/g, ` `)}</CardTitle>
          <Subtitle>{move?.generation?.name?.replace(/-/g, ` `)}</Subtitle>

          <Nav move={move} setVersion={setVersion} />

          <Data move={move} machines={machines} version={version} />

          <LearnMethod
            toggle={toggle}
            setToggle={setToggle}
            setLearn={setLearn}
          />

          <List
            toggle={toggle}
            pokedex={pokedex}
            moveName={move?.name}
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
  const { name } = context.query
  return {
    props: {
      name
    }
  }
}