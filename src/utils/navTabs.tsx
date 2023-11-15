import { type Dispatch, type SetStateAction } from 'react';

import * as Tabs from '@radix-ui/react-tabs';

import { learnMethod, regions } from './dataArrays';
import { removeDash } from './typography';

interface IProps {
  toggle?: number;
  setToggle: Dispatch<SetStateAction<number>>;
}

interface ILearnProps extends IProps {
  setLearn: Dispatch<SetStateAction<any>>;
}

export const LearnMethod = ({ setToggle, setLearn }: ILearnProps) => {
  return (
    <Tabs.List
      className="TabsList"
      aria-label="Switch between the different method for a Pokémon to learn a new move"
    >
      {Object.keys(learnMethod)?.map((l, i) => (
        <Tabs.Trigger
          className="TabsTrigger"
          value={String(i)}
          onClick={() => {
            setToggle(i);
            setLearn(learnMethod[l]);
          }}
          key={learnMethod[l]}
        >
          {removeDash(learnMethod[l])}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
};

export const RegionsMethod = ({ setToggle }: IProps) => {
  return (
    <Tabs.List
      className="TabsList TabsListOverflow"
      aria-label="Switch between the different regions"
    >
      {Object.keys(regions)?.map((r, i) => (
        <Tabs.Trigger
          className="TabsTrigger"
          value={String(i)}
          onClick={() => setToggle(i)}
          key={regions[r]}
        >
          {regions[r]}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
};
