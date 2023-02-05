import React from 'react';
import { MainBig } from '@/components/common/styles/Sizing';
import {
  AbilityCardEffect,
  AbilityCardSection,
} from '@/components/pages/Abilities/AbilityCard/Styled.AbilityCard';
import {
  CardTitle,
  H3,
  H4,
  Span,
  Subtitle,
} from '@/components/common/styles/Headings';
import Loader from '@/components/common/ui/Loader/Loader';
import Link from 'next/link';
import BackBtn from '@/components/common/ui/BackBtn';
import { useFilterAbility } from '@/components/pages/Abilities/AbilityCard/Hooks/useFilterAbility';
import HeadingAbility from '@/components/pages/Abilities/AbilityCard/Heading';
import dynamic from 'next/dynamic';
import TableAbilitycard from '@/components/pages/Abilities/AbilityCard/Components/Table.Abilitycard';
import { GetServerSidePropsContext } from 'next';

const DescAbilityCard = dynamic(
  () =>
    import(
      `@/components/pages/Abilities/AbilityCard/Components/Desc.AbilityCard`
    ),
);

type Props = {
  name: string;
}

function AbilityCard({ name }: Props) {

  const {
    isLoading,
    error,
    ability,
    pokedex,
    filterEffect,
    filterOverworld,
    filterDesc,
  } = useFilterAbility(name);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  const overworld = `Overworld`;

  return (
    <>
      <HeadingAbility name={name} />
      <MainBig>
        <CardTitle>{ability?.name?.replace(/-/g, ` `)}</CardTitle>
        <Subtitle>{ability?.generation?.name?.replace(/-/g, ` `)}</Subtitle>

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
            Pokemon with <Span>{ability?.name?.replace(/-/g, ` `)}</Span>
          </H3>
          <TableAbilitycard ability={ability} pokedex={pokedex} />
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
  const { name } = context.query
  return {
    props: {
      name
    }
  }
}