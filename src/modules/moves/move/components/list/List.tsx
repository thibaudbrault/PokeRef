import { IPokemon } from '@/types';
import {
  BreedingMoveText,
  EvolvingMoveText,
  LevelMoveText,
  MachinesMoveText,
  TutorMoveText,
} from './text/Text';
import { Content } from './content';
import { SmallLoader } from '@/components';

type Props = {
  pokemon?: IPokemon[];
  status: string;
  moveName: string;
  version: string;
  toggle: number;
};

export function List({ pokemon, status, moveName, version, toggle }: Props) {
  const textShown = () => {
    if (toggle === 0) {
      return <LevelMoveText version={version} />;
    } else if (toggle === 1) {
      return <MachinesMoveText version={version} />;
    } else if (toggle === 2) {
      return <BreedingMoveText version={version} />;
    } else if (toggle === 3) {
      return <TutorMoveText version={version} />;
    } else if (toggle === 4) {
      return <EvolvingMoveText version={version} />;
    }
  };

  if (status === `loading`) {
    return <SmallLoader />;
  }

  return (
    <>
      {textShown()}
      <Content
        pokemon={pokemon}
        moveName={moveName}
        version={version}
        toggle={toggle}
      />
    </>
  );
}
