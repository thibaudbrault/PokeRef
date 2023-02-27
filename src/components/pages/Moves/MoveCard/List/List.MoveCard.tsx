import SmallLoader from '@/components/common/ui/Loader/SmallLoader';
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
  status: string;
  moveName: string;
  version: string;
  toggle: number;
};

function List({ pokedex, status, moveName, version, toggle }: Props) {
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
        pokedex={pokedex}
        moveName={moveName}
        version={version}
        toggle={toggle}
      />
    </>
  );
}

export default List;
