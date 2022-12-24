import React from 'react';
import { generations, learnMethod, regions, types } from './DataArrays';
import { MethodNav } from '@/components/common/styles/Navbars';
import { LocationNav } from '@/components/pages/Locations/Styled.Locations';

type Props = {
  toggleState: number;
  toggleTable: (i: number) => void;
};

export const GenerationsMethod = () => {
  return (
    <>
      {Object.keys(generations)?.map((g) => (
        <option value={generations[g].value} key={generations[g].value}>
          {generations[g].name.charAt(0).toUpperCase() +
            generations[g].name.slice(1)}
        </option>
      ))}
    </>
  );
};

export const LearnMethod = ({ toggleState, toggleTable }: Props) => {
  return (
    <MethodNav>
      {Object.keys(learnMethod)?.map((l, i) => (
        <button
          className={toggleState === i ? `button_active` : ``}
          onClick={() => toggleTable(i)}
          key={learnMethod[l]}
        >
          <p>{learnMethod[l].replace(/-/g, ` `)}</p>
        </button>
      ))}
    </MethodNav>
  );
};

export const RegionsMethod = ({ toggleState, toggleTable }: Props) => {
  return (
    <LocationNav>
      {Object.keys(regions)?.map((r, i) => (
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
};

export const TypesMethod = () => {
  return (
    <>
      {Object.keys(types)?.map((t) => (
        <option value={types[t]} key={types[t]}>
          {types[t].charAt(0).toUpperCase() + types[t].slice(1)}
        </option>
      ))}
    </>
  );
};
