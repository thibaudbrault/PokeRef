import React from 'react';
import { regions } from './DataMap';
import { LocationNav } from '../components/Locations/StyledLocations';

type Props = {
  toggleState: number;
  toggleTable: (i: number) => void;
};

function RegionsMethod({ toggleState, toggleTable }: Props) {
  return (
    <LocationNav>
      {Object.keys(regions).map((r, i) => (
        <button
          className={toggleState === i ? `button_active` : ``}
          onClick={() => toggleTable(i)}
          key={regions[r]}
        >
          <p>{regions[r]}</p>
        </button>
      ))}
    </LocationNav>
  );
}

export default RegionsMethod;
