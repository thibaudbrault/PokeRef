import { H3, H4 } from '@/components/common/styles/Headings';
import { MethodNav } from '@/components/common/styles/Navbars';
import { Section } from '@/components/common/styles/Sizing';
import SmallLoader from '@/components/common/ui/Loader/SmallLoader';
import {
  IFormatAnalysesSets,
  IFormatsAnalysesSetName,
} from '@/types/Competitive/Analyses';
import { getFormat } from '@/utils/DataFetch';
import { capitalize } from '@/utils/Typography';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  PokemonSetComment,
  PokemonSetDesc,
  PokemonSetsContainer,
} from './Styled.Competitive.PokemonCard';

type Props = {
  format: string;
  name: string;
};

function Competitive({ format, name }: Props) {
  const [toggle, setToggle] = useState<number>(0);

  const [analyses, formats, sets] = useQueries({
    queries: [
      {
        queryKey: [`analyses`, format],
        queryFn: () =>
          getFormat(
            `https://raw.githubusercontent.com/pkmn/smogon/main/data/analyses/${format}.json`,
          ),
      },
      {
        queryKey: [`formats`],
        queryFn: () =>
          getFormat(
            `https://raw.githubusercontent.com/pkmn/smogon/main/data/formats/index.json`,
          ),
      },
      {
        queryKey: [`sets`, format],
        queryFn: () =>
          getFormat(
            `https://raw.githubusercontent.com/pkmn/smogon/main/data/sets/${format}.json`,
          ),
      },
    ],
  });

  if (
    analyses.status === `error` ||
    formats.status === `error` ||
    sets.status === `error`
  ) {
    return toast.error(`Something went wrong`);
  }

  if (
    analyses.status === `loading` ||
    formats.status === `loading` ||
    sets.status === `loading`
  ) {
    return <SmallLoader />;
  }

  const pokemonAnalyses = Object.entries(analyses.data)
    .map(([pokemonAnalysesName, value]) =>
      Object.assign({ pokemonAnalysesName }, value),
    )
    .find((n) => n.pokemonAnalysesName === capitalize(name));

  const pokemonSets = Object.entries(sets.data)
    .map(([pokemonSetsName, value]) =>
      Object.assign({ pokemonSetsName }, value),
    )
    .find((n) => n.pokemonSetsName === capitalize(name));

  const { pokemonAnalysesName, ...filteredAnalyses } = pokemonAnalyses;
  const { pokemonSetsName, ...filteredSets } = pokemonSets;

  const formattedName = (formatName: string) => {
    return (
      Object.entries(formats.data)
        .filter((f) => f[0] === formatName && f[1])
        .flat()[1] || formatName
    );
  };

  const setsEntries = <T,>(obj: T): T => {
    return Object.entries(obj)[toggle][1];
  };

  const overview: string | undefined = setsEntries(
    filteredAnalyses as IFormatAnalysesSets,
  ).overview;

  const comments: string | undefined = setsEntries(
    filteredAnalyses as IFormatAnalysesSets,
  ).comments;

  const textFormatting = (str: string) =>
    str.replaceAll(`-types`, ` types`).replaceAll(`-type`, ` type`);

  const test = (obj, i) => {
    return Object.entries(
      Object.entries(setsEntries(filteredSets)).map((m) => m[1]),
    )
      .filter((m) => m[0] == i)
      .flat()[1].moves;
  };

  return (
    <Section>
      <H3>Competitive</H3>
      <MethodNav>
        {Object.keys(filteredAnalyses).map((fa, i) => (
          <button
            key={fa}
            className={toggle === i ? `button_active` : ``}
            onClick={() => setToggle(i)}
          >
            <p>{formattedName(fa) as string}</p>
          </button>
        ))}
      </MethodNav>
      <PokemonSetsContainer>
        {overview && (
          <li>
            <H4>Overview</H4>
            <PokemonSetDesc dangerouslySetInnerHTML={{ __html: overview }} />
          </li>
        )}
        {setsEntries(filteredAnalyses as IFormatAnalysesSets).sets.map(
          (s: IFormatsAnalysesSetName, i) => (
            <li key={s.name}>
              <H4>{s.name}</H4>
              <p>{test(filteredSets, i)}</p>
              {s.description && (
                <PokemonSetDesc
                  dangerouslySetInnerHTML={{
                    __html: textFormatting(s.description),
                  }}
                />
              )}
            </li>
          ),
        )}
        {comments && (
          <li>
            <PokemonSetComment
              dangerouslySetInnerHTML={{ __html: textFormatting(comments) }}
            />
          </li>
        )}
      </PokemonSetsContainer>
    </Section>
  );
}

export default Competitive;
