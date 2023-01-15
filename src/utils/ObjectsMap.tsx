import React, { Dispatch, SetStateAction } from 'react';
import { learnMethod, regions } from './DataArrays';
import { MethodNav } from '@/components/common/styles/Navbars';
import { LocationNav } from '@/components/pages/Locations/Styled.Locations';

type Props = {
  toggle: number;
  setToggle: Dispatch<SetStateAction<number>>;
};

export const LearnMethod = ({ toggle, setToggle, setLearn }: Props) => {
  return (
    <MethodNav>
      {Object.keys(learnMethod)?.map((l, i) => (
        <button
          className={toggle === i ? `button_active` : ``}
          onClick={() => {
            setToggle(i);
            setLearn(learnMethod[l]);
          }}
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
