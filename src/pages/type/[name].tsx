import { CardTitle } from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingType from '@/components/pages/Types/TypeCard/Heading';
import { getMoves, getPokedex, getType } from '@/utils/DataFetch';
import { useQueries } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const DamageType = dynamic(
  () => import(`../../components/pages/Types/TypeCard/Damage/Damage.TypeCard`),
);
const MovesType = dynamic(
  () => import(`../../components/pages/Types/TypeCard/Moves/Moves.TypeCard`),
);
const PokemonType = dynamic(
  () =>
    import(`../../components/pages/Types/TypeCard/Pokemon/Pokemon.TypeCard`),
);

type Props = {
  name: string;
};

function TypeCard({ name }: Props) {

  const results = useQueries({
    queries: [
      {
        queryKey: ['type'],
        queryFn: () => getType(`https://pokeapi.co/api/v2/type/${name}`)
      },
      {
        queryKey: ['pokedex'],
        queryFn: () => getPokedex(`https://pokeapi.co/api/v2/pokemon?limit=1008`)
      },
      {
        queryKey: ['moves'],
        queryFn: getMoves
      },
    ]
  })

  if (results[0].status === 'error') {
    return { error };
  }

  if (results[0].status === 'loading') {
    return <Loader />;
  }

  console.log(results[0].data)

  return (
    <>
      <HeadingType name={name} />
      <MainBig>
        <CardTitle>{results[0].data.name}</CardTitle>

        <DamageType type={results[0].data} />

        <PokemonType type={results[0].data} pokedex={results[1].data} />

        <MovesType type={results[0].data} moves={results[2].data} />

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
