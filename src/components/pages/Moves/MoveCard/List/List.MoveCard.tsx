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
