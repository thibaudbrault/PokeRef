import { Locations } from '@/types/types';
import React from 'react';
import { LocationNav, LocationNavContainer } from '../../Styled.Locations';

type Props = {
  location?: Locations.Locations;
  toggleState: number;
  toggleTable: (index: number) => void;
};

function AreaLocationCard({ location, toggleState, toggleTable }: Props) {
  return (
    <LocationNavContainer>
      <LocationNav>
        {location?.areas?.map((la, i) => (
          <button
            key={la.name}
            className={toggleState === i ? `button_active` : ``}
            onClick={() => toggleTable(i)}
          >
            <p>
              {la.name
                .replace(/-/g, ` `)
                .replace(/kanto|johto|hoenn|sinnoh|unova|kalos|alola/, ``)
                .replace(/area/, ``)}
            </p>
          </button>
        ))}
      </LocationNav>
      <span>There is no information about this area</span>
    </LocationNavContainer>
  );
}

export default AreaLocationCard;
