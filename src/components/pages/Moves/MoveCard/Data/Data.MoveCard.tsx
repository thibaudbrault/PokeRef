import { IMachine } from '@/types/Machines/Machine';
import { IMove } from '@/types/Moves/Move';
import { MoveCardDataSection } from './Styled.Data.MoveCard';
import dynamic from 'next/dynamic';

interface IEffectProps {
  move: IMove;
  version: string;
}

const Desc = dynamic(() => import(`./Desc/Desc.MoveCard`));
const Effect = dynamic<IEffectProps>(
  () => import(`./Effect/Effect.MoveCard`) as any,
);

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
