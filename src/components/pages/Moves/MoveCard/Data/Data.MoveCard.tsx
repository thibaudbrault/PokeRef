import { IMachine } from '@/types/Machines/Machine';
import { IMove } from '@/types/Moves/Move';
import Desc from './Desc/Desc.MoveCard';
import Effect from './Effect/Effect.MoveCard';
import { MoveCardDataSection } from './Styled.Data.MoveCard';

type Props = {
  move: IMove;
  machine?: IMachine[];
  version: string;
};

function Data({ move, machine, version }: Props) {
  return (
    <MoveCardDataSection>
      <Desc move={move} machine={machine} version={version} />
      <Effect move={move} version={version} />
    </MoveCardDataSection>
  );
}

export default Data;
