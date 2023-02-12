import { CardTitle, Subtitle } from '@/components/common/styles/Headings';
import { Divider } from '@/components/common/styles/Misc';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingMove from '@/components/pages/Moves/MoveCard/Heading';
import { useFetchMove } from '@/components/pages/Moves/MoveCard/Hooks/useFetchMove';
import List from '@/components/pages/Moves/MoveCard/List/List.MoveCard';
import { MoveMainBig } from '@/components/pages/Moves/MoveCard/Styled.MoveCard';
import { removeDash } from '@/utils/Typography';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';

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
};

function MoveCard({ name }: Props) {
  const [learn, setLearn] = useState<string>(`level-up`);

  const { results, version, setVersion, toggle, setToggle } =
    useFetchMove(name);

  if (results[0].status === `error`) {
    return { error };
  }

  if (results[0].status === `loading`) {
    return <Loader />;
  }

  return (
    <>
      <HeadingMove name={name} />
      {results[0].status === `success` && (
        <MoveMainBig>
          <CardTitle>{removeDash(results[0].data?.name)}</CardTitle>
          <Subtitle>{removeDash(results[0].data?.generation?.name)}</Subtitle>

          <Nav move={results[0].data} setVersion={setVersion} />

          <Data
            move={results[0].data}
            machines={results[2].data}
            version={version}
          />

          <Divider />

          <LearnMethod
            toggle={toggle}
            setToggle={setToggle}
            setLearn={setLearn}
          />

          <List
            toggle={toggle}
            pokedex={results[1].data}
            moveName={results[0].data?.name}
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
