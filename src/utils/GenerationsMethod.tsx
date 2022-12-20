import React from 'react';
import { generations } from './DataArrays';

function GenerationsMethod() {
    return (
        <>
            {Object.keys(generations)?.map((g, i) => (
                <option value={generations[g]}>
                    {generations[g].charAt(0).toUpperCase() + generations[g].slice(1)}
                </option>
            ))}
        </>
    );
}

export default GenerationsMethod;