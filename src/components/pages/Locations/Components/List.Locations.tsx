import React from 'react';
import { useToggleLocation } from '@/components/pages/Locations/Hooks/useToggleLocation';
import { LocationList } from '../Styled.Locations';
import Link from 'next/link';

type Props = {
  location: string | null;
};

function ListLocations({ location }: Props) {
  const { locations } = useToggleLocation();

  return (
    <>
      {locations?.map(
        (l) =>
          l.name === location &&
          location !== `galar` && (
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
    </>
  );
}

export default ListLocations;
