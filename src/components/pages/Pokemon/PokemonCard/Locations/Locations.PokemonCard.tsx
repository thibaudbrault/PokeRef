import { H3 } from '@/components/common/styles/Headings';
import { Section } from '@/components/common/styles/Sizing';
import { ILocationAreaEncounter } from '@/types/Pokemon/Pokemon';
import { useMemo } from 'react';

type Props = {
  location: ILocationAreaEncounter[];
  game: string;
};

function Locations({ location, game }: Props) {
  const data = useMemo(
    () =>
      location
        .map((l) => l.version_details.filter((lv) => lv.version.name === game))
        .flat(),
    [location, game],
  );

  console.log(data);

  return (
    <Section>
      <H3>Locations</H3>
    </Section>
  );
}

export default Locations;
