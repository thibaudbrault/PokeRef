import React from 'react';
import { learnMethod } from './DataArrays';
import { MethodNav } from '../components/CommonStyles/Navbars';

type Props = {
  toggleState: number;
  toggleTable: (i: number) => void;
};

function LearnMethod({ toggleState, toggleTable }: Props) {
  return (
    <MethodNav>
      {Object.keys(learnMethod).map((l, i) => (
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
}

export default LearnMethod;
