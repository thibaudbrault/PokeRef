import React from 'react';
import { Machines, Moves } from '@/types/types';
import Desc from './Desc/Desc.MoveCard';
import Effect from './Effect/Effect.MoveCard';
import { MoveCardDataSection } from './StyledData.MoveCard';

type Props = {
  move: Moves;
  machine: Machines;
  version: string;
};

function Data({ move, machine, version }: Props) {
  return (
    <MoveCardDataSection>
      <Desc move={move} machines={machine} version={version} />
      <Effect move={move} version={version} />
    </MoveCardDataSection>
  );
}

export default Data;
