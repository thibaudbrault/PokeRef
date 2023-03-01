import { H3 } from '@/components/common/styles/Headings';
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
        queryKey: ['formats'],
        queryFn: () =>
          getFormat(
            `https://raw.githubusercontent.com/pkmn/smogon/main/data/formats/index.json`,
          ),
      },
      {
        queryKey: ['sets', format],
        queryFn: () =>
          getFormat(
            `https://raw.githubusercontent.com/pkmn/smogon/main/data/sets/${format}.json`,
          ),
      },
    ],
  });

  if (
    analyses.status === 'error' ||
    formats.status === 'error' ||
    sets.status === 'error'
  ) {
    return toast.error(`Something went wrong`);
  }

  if (
    analyses.status === 'loading' ||
    formats.status === 'loading' ||
    sets.status === 'loading'
  ) {
    return <SmallLoader />;
  }

  const pokemonFormat = Object.entries(analyses.data)
    .map(([pokemonName, value]) => Object.assign({ pokemonName }, value))
    .find((n) => n.pokemonName === capitalize(name));

  const pokemonSets = Object.entries(sets.data)
    .map(([pokemonName, value]) => Object.assign({ pokemonName }, value))
    .find((n) => n.pokemonName === capitalize(name));

  console.log(pokemonSets);

  const { pokemonName, ...formatsAnalyses } = pokemonFormat;

  const formattedName = (formatName: string) => {
    return (
      Object.entries(formats.data)
        .filter((f) => f[0] === formatName && f[1])
        .flat()[1] || formatName
    );
  };

  return (
    <Section>
      <H3>Competitive</H3>
      <MethodNav>
        {Object.keys(formatsAnalyses).map((fa, i) => (
          <button
            className={toggle === i ? `button_active` : ``}
            onClick={() => setToggle(i)}
          >
            <p>{formattedName(fa) as string}</p>
          </button>
        ))}
      </MethodNav>
      {Object.entries(formatsAnalyses)[toggle][1].sets.map(
        (s: IFormatsAnalysesSetName) => (
          <>
            <p>{s.name}</p>
            <p>{s.description}</p>
          </>
        ),
      )}
    </Section>
  );
}

export default Competitive;
