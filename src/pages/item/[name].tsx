import React from 'react';
import { MainBig } from '../../components/Common/Sizing';
import { CardTitle, Span, Subtitle } from '../../components/Common/Headings';
import { BackButton } from '../../components/Common/Inputs';
import {
  ItemCardDataCost,
  ItemCardDataEffect,
  ItemCardDataFling,
  ItemCardDataHeld,
  ItemCardDataSection,
  ItemCardDescSection,
  ItemCardDescTable,
  ItemCardDescTitle,
} from '../../components/Items/ItemCard/StyledItemCard.js';
import { useItem } from '../../hooks/DataFetch';
import Loader from '../../components/Loader/Loader';
import { FaChevronLeft } from '@meronex/icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';

function ItemCard() {
  const router = useRouter();
  const { name } = router.query;

  const {
    isLoading,
    error,
    data: item,
  } = useItem(`https://pokeapi.co/api/v2/item/${name}`);

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>
          {name.charAt(0).toUpperCase() + name.slice(1)} | Items | PokéRef
        </title>
        <meta name="description" content={`Find every details about ${name}`} />
        <meta property="og:title" content={`${name} | Items | PokéRef`} />
        <meta
          property="og:description"
          content={`Find every details about ${name}`}
        />
        <meta property="og:url" content={`https://pokeref.app/item/${name}`} />
        <meta property="og:type" content="website" />
      </Head>
      <MainBig>
        <CardTitle>{item?.name?.replace(/-/g, ` `)}</CardTitle>
        <Subtitle>{item?.category?.name?.replace(/-/g, ` `)}</Subtitle>

        <ItemCardDataSection>
          <div>
            <ItemCardDataEffect>
              <h3>Effect</h3>
              {item?.effect_entries?.map(
                (ie) =>
                  ie?.language?.name === `en` && (
                    <p key={ie.short_effect}>{ie?.short_effect}</p>
                  ),
              )}
            </ItemCardDataEffect>
            {item?.cost !== 0 && (
              <ItemCardDataCost>
                Cost : {item?.cost} Pokédollars
              </ItemCardDataCost>
            )}
            {item?.held_by_pokemon?.length !== 0 && (
              <ItemCardDataHeld>
                Held by :
                {item?.held_by_pokemon?.map((ih) => (
                  <Link
                    href={{
                      pathname: `/pokemon/[name]`,
                      query: { name: ih.pokemon.name },
                    }}
                    key={ih?.pokemon?.name}
                  >
                    {ih?.pokemon?.name.replace(/-/g, ` `)}
                  </Link>
                ))}
              </ItemCardDataHeld>
            )}
            <ItemCardDataFling>
              When the pokémon holds{` `}
              <Span>{item?.name?.replace(/-/g, ` `)}</Span> the move{` `}
              <i>Fling</i> has {item?.fling_power} power.
              {item?.fling_effect?.name !== undefined &&
                item?.fling_effect?.name !== `berry-effect` &&
                item?.fling_effect?.name !== `herb-effect` &&
                ` The move will ${item?.fling_effect?.name?.replace(
                  /-/g,
                  ` `,
                )} the target.`}
            </ItemCardDataFling>
          </div>
          <div>
            <Image
              src={item?.sprites?.default}
              alt={item?.name}
              width={96}
              height={96}
            />
          </div>
        </ItemCardDataSection>

        <ItemCardDescSection>
          <ItemCardDescTitle>Game descriptions</ItemCardDescTitle>
          <ItemCardDescTable>
            <tbody>
              {item?.flavor_text_entries?.map((ift) =>
                ift?.language?.name === `en` ? (
                  <tr key={ift.text}>
                    <th>{ift?.version_group?.name?.replace(/-/g, ` `)}</th>
                    <td>{ift?.text}</td>
                  </tr>
                ) : (
                  ``
                ),
              )}
            </tbody>
          </ItemCardDescTable>
        </ItemCardDescSection>

        <Link href="/items" passHref>
          <BackButton>
            <FaChevronLeft /> Back to Items
          </BackButton>
        </Link>
      </MainBig>
    </>
  );
}

export default ItemCard;
