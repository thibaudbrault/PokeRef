import React from 'react';
import { regions } from '/helpers/DataMap';
import { LocationNav } from '/components/Locations/StyledLocations';

function RegionsMethod() {
    return (
        <LocationNav>
            {Object.keys(regions).map((r, i) => (
                <button
                    className={toggleState === i ? 'button_active' : ''}
                    onClick={() => toggleTable(i)}
                    key={regions[r]}
                >
                    <p>{regions[r]}</p>
                </button>
            ))}
        </LocationNav>
    )
}

export default RegionsMethod