import React from 'react';
import { THead } from '../styles/Table';

type Props = {
  array: string[];
};

function TableHead({ array }: Props) {
  return (
    <THead>
      <tr>
        {array.map((a) => (
          <th key={a}>{a}</th>
        ))}
      </tr>
    </THead>
  );
}

export default TableHead;