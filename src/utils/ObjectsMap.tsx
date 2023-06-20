import { MethodNav } from '@/components/common/styles/Navbars';
import styles from '@/components/pages/Locations/Locations.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { learnMethod, regions } from './DataArrays';
import { removeDash } from './Typography';

interface IProps {
  toggle: number;
  setToggle: Dispatch<SetStateAction<number>>;
}

interface ILearnProps extends IProps {
  setLearn: Dispatch<SetStateAction<any>>;
}

export const LearnMethod = ({ toggle, setToggle, setLearn }: ILearnProps) => {
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
          <p>{removeDash(learnMethod[l])}</p>
        </button>
      ))}
    </MethodNav>
  );
};

export const RegionsMethod = ({ toggle, setToggle }: IProps) => {
  return (
    <nav className={styles.nav}>
      {Object.keys(regions)?.map((r, i) => (
        <button
          className={toggle === i ? `button_active` : ``}
          onClick={() => setToggle(i)}
          key={regions[r]}
        >
          <p>{regions[r]}</p>
        </button>
      ))}
    </nav>
  );
};
