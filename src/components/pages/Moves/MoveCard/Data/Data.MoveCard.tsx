import React from 'react';
import { Machines, Moves } from '@/types/types';
import Desc from './Desc/Desc.MoveCard';
import Effect from './Effect/Effect.MoveCard';
import { MoveCardDataSection } from './Styled.Data.MoveCard';

type Props = {
  move: Moves.Moves;
  machines?: Machines.Machines[];
  version: string;
};

function Data({ move, machines, version }: Props) {
  return (
    <MoveCardDataSection>
      <Desc move={move} machines={machines} version={version} />
      <Effect move={move} version={version} />
    </MoveCardDataSection>
  );
}

export default Data;
