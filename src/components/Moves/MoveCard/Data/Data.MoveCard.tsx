import React from 'react';
import { Move } from '@/types/types';
import Desc from './Desc/Desc.MoveCard';
import Effect from './Effect/Effect.MoveCard';
import { MoveCardDataSection } from './StyledData.MoveCard';

type Props = {
  move: Move;
  machine: any[];
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
