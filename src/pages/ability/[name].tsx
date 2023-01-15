import React from 'react';
import { MainBig } from '@/components/common/styles/Sizing';
import {
  AbilityCardEffect,
  AbilityCardSection,
  AbilityCardTable,
  Sup,
} from '@/components/pages/Abilities/AbilityCard/Styled.AbilityCard';
import {
  CardTitle,
  H3,
  H4,
  Span,
  Subtitle,
} from '@/components/common/styles/Headings';
import {
  TableContainer,
  ModifiedTable,
  THead,
} from '@/components/common/styles/Table';
import Loader from '@/components/common/ui/Loader/Loader';
import { useRouter } from 'next/router';
import Link from 'next/link';
import BackBtn from '@/components/common/ui/BackBtn';
import { useFilterAbility } from '@/components/pages/Abilities/AbilityCard/Hooks/useFilterAbility';
import HeadingAbility from '@/components/pages/Abilities/AbilityCard/Heading';
import dynamic from 'next/dynamic';

const DescAbilityCard = dynamic(
  () =>
    import(
      `@/components/pages/Abilities/AbilityCard/Components/Desc.AbilityCard`
    ),
);
const ListAbilityCard = dynamic(
  () =>
    import(
      `@/components/pages/Abilities/AbilityCard/Components/List.AbilityCard`
    ),
);

function AbilityCard() {
  const router = useRouter();
  const { name } = router.query;

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
        <CardTitle>{ability?.name.replace(/-/g, ` `)}</CardTitle>
        <Subtitle>{ability?.generation.name.replace(/-/g, ` `)}</Subtitle>

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

        <AbilityCardSection>
          <H3>Game descriptions</H3>
          <AbilityCardTable>
            <tbody>
              <DescAbilityCard filterDesc={filterDesc} />
            </tbody>
          </AbilityCardTable>
        </AbilityCardSection>

        <AbilityCardSection>
          <H3>
            Pokemon with <Span>{ability?.name.replace(/-/g, ` `)}</Span>
          </H3>
          <TableContainer>
            <ModifiedTable>
              <THead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>
                    1<Sup>st</Sup> ability
                  </th>
                  <th>
                    2<Sup>nd</Sup> ability
                  </th>
                  <th>Hidden ability</th>
                </tr>
              </THead>
              <tbody>
                <ListAbilityCard ability={ability} pokedex={pokedex} />
              </tbody>
            </ModifiedTable>
          </TableContainer>
        </AbilityCardSection>

        <Link href="/abilities" passHref>
          <BackBtn name="Abilities" />
        </Link>
      </MainBig>
    </>
  );
}

export default AbilityCard;
