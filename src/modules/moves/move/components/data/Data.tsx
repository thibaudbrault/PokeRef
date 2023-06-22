import { IMachine } from '@/types/Machines/Machine';
import { IMove } from '@/types/Moves/Move';
import { MoveCardDataSection } from './Styled.Data.MoveCard';
import { Description } from './description';
import { Effect } from './effect';

type Props = {
  move: IMove;
  machine?: IMachine[];
  version: string;
};

export function Data({ move, machine, version }: Props) {
  return (
    <MoveCardDataSection>
      <Description move={move} machine={machine} version={version} />
      <Effect move={move} version={version} />
    </MoveCardDataSection>
  );
}
