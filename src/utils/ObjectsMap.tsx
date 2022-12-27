import React, { Dispatch, SetStateAction } from 'react';
import { generations, learnMethod, regions, types } from './DataArrays';
import { MethodNav } from '@/components/common/styles/Navbars';
import { LocationNav } from '@/components/pages/Locations/Styled.Locations';

type Props = {
  toggle: number;
  setToggle: Dispatch<SetStateAction<number>>;
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

export const LearnMethod = ({ toggle, setToggle }: Props) => {
  return (
    <MethodNav>
      {Object.keys(learnMethod)?.map((l, i) => (
        <button
          className={toggle === i ? `button_active` : ``}
          onClick={() => setToggle(i)}
          key={learnMethod[l]}
        >
          <p>{learnMethod[l].replace(/-/g, ` `)}</p>
        </button>
      ))}
    </MethodNav>
  );
};

export const RegionsMethod = ({ toggle, setToggle }: Props) => {
  return (
    <LocationNav>
      {Object.keys(regions)?.map((r, i) => (
        <button
          className={toggle === i ? `button_active` : ``}
          onClick={() => setToggle(i)}
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
