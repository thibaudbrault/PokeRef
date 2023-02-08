import { IRegion } from '@/types/Locations/Region';
import Link from 'next/link';
import { LocationList, LocationSection } from '../Styled.Locations';

type Props = {
  location: string | null;
  locations?: IRegion[];
};

function ListLocations({ location, locations }: Props) {
  return (
    <LocationSection>
      {locations?.map(
        (l) =>
          l.name === location && (
            <LocationList key={l.name}>
              {l.locations
                .sort((a, b) => a.name.localeCompare(b.name))
                ?.map((ll) => (
                  <li key={ll.name}>
                    <Link
                      href={{
                        pathname: `/location/[name]`,
                        query: { name: ll.name },
                      }}
                      key={ll.name}
                    >
                      {ll.name
                        .replace(/-/g, ` `)
                        .replace(
                          /kanto|johto|hoenn|sinnoh|unova|kalos|alola/g,
                          ``,
                        )}
                    </Link>
                  </li>
                ))}
            </LocationList>
          ),
      )}
    </LocationSection>
  );
}

export default ListLocations;
