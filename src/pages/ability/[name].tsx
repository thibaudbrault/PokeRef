import {
  CardTitle,
  H3,
  H4,
  Capitalize,
  Subtitle,
} from '@/components/common/styles/Headings';
import { MainBig } from '@/components/common/styles/Sizing';
import BackBtn from '@/components/common/ui/BackBtn';
import Loader from '@/components/common/ui/Loader/Loader';
import TableAbilitycard from '@/components/pages/Abilities/AbilityCard/Components/Table.Abilitycard';
import HeadingAbility from '@/components/pages/Abilities/AbilityCard/Heading';
import { useFilterAbility } from '@/components/pages/Abilities/AbilityCard/Hooks/useFilterAbility';
import {
  AbilityCardEffect,
  AbilityCardSection,
} from '@/components/pages/Abilities/AbilityCard/Styled.AbilityCard';
import { removeDash } from '@/utils/Typography';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import toast from 'react-hot-toast';

const DescAbilityCard = dynamic(
  () =>
    import(
      `@/components/pages/Abilities/AbilityCard/Components/Desc.AbilityCard`
    ),
);

type Props = {
  name: string;
};

function AbilityCard({ name }: Props) {
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
    return toast.error(`Something went wrong: ${error.message}`);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingAbility name={name} />
      <MainBig>
        <CardTitle>{removeDash(ability?.name)}</CardTitle>
        <Subtitle>{removeDash(ability?.generation?.name)}</Subtitle>

        <AbilityCardSection>
          <AbilityCardEffect>
            <H3>Effect</H3>
            <p>{filterEffect?.effect}</p>
          </AbilityCardEffect>
          {filterOverworld && (
            <AbilityCardEffect>
              <H4>Overworld</H4>
              <p>
                {filterOverworld?.effect
                  .slice(filterOverworld.effect.indexOf(overworld))
                  .replace(`Overworld:`, ``)}
              </p>
            </AbilityCardEffect>
          )}
        </AbilityCardSection>
        <DescAbilityCard filterDesc={filterDesc} />
        <AbilityCardSection>
          <H3>
            Pokemon with <Capitalize>{removeDash(ability?.name)}</Capitalize>
          </H3>
          <TableAbilitycard ability={ability} pokemon={pokemon} />
        </AbilityCardSection>
        <Link href="/abilities" passHref>
          <BackBtn name="Abilities" />
        </Link>
      </MainBig>
    </>
  );
}

export default AbilityCard;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;
  return {
    props: {
      name,
    },
  };
}
