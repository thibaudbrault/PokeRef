import { removeDash } from '@/utils';

import styles from '../../../Move.module.scss';

type Props = {
  version: string;
};

export const LevelMoveText = ({ version }: Props) => {
  return (
    <>
      <h3 className="h3">Learned by leveling up</h3>
      {` `}
      <p className={styles.text}>
        Learned when the pokémon reach a certain level. Data from Pokémon{` `}
        <span>{removeDash(version)}</span>. These information may vary in other
        games. Check the respective pokédex pages for details.{` `}
      </p>
    </>
  );
};
export const MachinesMoveText = ({ version }: Props) => {
  return (
    <>
      <h3 className="h3">Learned from a TM / HM</h3>
      {` `}
      <p className={styles.text}>
        Learned by using a TM or a HM. Data from Pokémon{` `}
        <span>{removeDash(version)}</span>. These information may vary in other
        games. Check the respective pokédex pages for details.{` `}
      </p>
    </>
  );
};

export const BreedingMoveText = ({ version }: Props) => {
  return (
    <>
      <h3 className="h3">Learned from the move relearner / by breeding</h3>
      {` `}
      <p className={styles.text}>
        Learned via the move relearner or through breeding. Data from Pokémon
        {` `}
        <span>{removeDash(version)}</span>. These information may vary in other
        games. Check the respective pokédex pages for details.{` `}
      </p>
    </>
  );
};

export const TutorMoveText = ({ version }: Props) => {
  return (
    <>
      <h3 className="h3">Learned from the move tutor</h3>
      {` `}
      <p className={styles.text}>
        Learned by going to the move tutor. Data from Pokémon{` `}
        <span>{removeDash(version)}</span>. These information may vary in other
        games. Check the respective pokédex pages for details.{` `}
      </p>
    </>
  );
};

export const EvolvingMoveText = ({ version }: Props) => {
  return (
    <>
      <h3 className="h3">Learned when evolving</h3>
      {` `}
      <p className={styles.text}>
        Learned when the pokémon is evolving no matter its level. Data from
        Pokémon <span>{removeDash(version)}</span>. These information may vary
        in other games. Check the respective pokédex pages for details.{` `}
      </p>
    </>
  );
};
