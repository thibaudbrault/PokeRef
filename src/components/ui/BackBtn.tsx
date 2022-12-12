import React from 'react';
import { BackButton } from '../CommonStyles/Inputs';
import { FaChevronLeft } from '@meronex/icons/fa';

type Props = {
  name: string;
};

function BackBtn({ name }: Props) {
  return (
    <BackButton>
      <FaChevronLeft /> Back to {name}
    </BackButton>
  );
}

export default BackBtn;
