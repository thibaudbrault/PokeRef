import React from 'react';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import Content from './Content/Content.MoveCard';
import {
  BreedingMoveText,
  EvolvingMoveText,
  LevelMoveText,
  MachinesMoveText,
  TutorMoveText,
} from './Text/Text.MoveCard';

type Props = {
  pokedex?: IPokemon[];
  moveName: string;
  version: string;
  toggle: number;
};

function List({ pokedex, moveName, version, toggle }: Props) {
  const textShown = () => {
    if (toggle === 0) {
      return <LevelMoveText />;
    } else if (toggle === 1) {
      return <MachinesMoveText />;
    } else if (toggle === 2) {
      return <BreedingMoveText />;
    } else if (toggle === 3) {
      return <TutorMoveText />;
    } else if (toggle === 4) {
      return <EvolvingMoveText />;
    }
  };

  return (
    <>
      {textShown()}
      <Content
        pokedex={pokedex}
        moveName={moveName}
        version={version}
        toggle={toggle}
      />
    </>
  );
}

export default List;
