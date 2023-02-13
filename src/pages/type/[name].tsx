import {
  CardTitle,
  CardTitleWithImage,
} from '@/components/common/styles/Headings';
import { Divider } from '@/components/common/styles/Misc';
import { MethodNav } from '@/components/common/styles/Navbars';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingType from '@/components/pages/Types/TypeCard/Heading';
import { useToggleTable } from '@/components/pages/Types/TypeCard/Hooks/useToggleTable';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import error from 'next/error';
import Image from 'next/image';
import Link from 'next/link';

const DamageType = dynamic(
  () => import(`../../components/pages/Types/TypeCard/Damage/Damage.TypeCard`),
);

type Props = {
  name: string;
};

function TypeCard({ name }: Props) {
  const { results, toggle, setToggle, pageShown } = useToggleTable(name);

  if (results[0].status === `error`) {
    return { error };
  }

  if (results[0].status === `loading`) {
    return <Loader />;
  }

  return (
    <>
      <HeadingType name={name} />
      <MainBig>
        <CardTitleWithImage>
          <Image
            src={`https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/masters/${name}.png`}
            alt=""
            width={96}
            height={96}
          />
          <CardTitle>{results[0].data.name}</CardTitle>
        </CardTitleWithImage>
        <DamageType type={results[0].data} />
        <Divider />
        <MethodNav>
          <button
            className={toggle === 1 ? `button_active` : ``}
            onClick={() => setToggle(1)}
          >
            <p>Pokémon</p>
          </button>
          <button
            className={toggle === 2 ? `button_active` : ``}
            onClick={() => setToggle(2)}
          >
            <p>Moves</p>
          </button>
        </MethodNav>
        {pageShown()}
        <Link href="/types" passHref>
          <BackBtn name="Types" />
        </Link>
      </MainBig>
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
