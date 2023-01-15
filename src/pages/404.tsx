import React from 'react';
import {
  NotFoundMain,
  NotFoundImg,
  NotFoundText,
} from '@/components/pages/404/Styled.NotFound';

function NotFound() {
  return (
    <NotFoundMain>
      <NotFoundImg src={`/MissingNo.png`} alt="MissingNo" />
      <NotFoundText>Oops !</NotFoundText>
      <NotFoundText>The URL entered does not exist</NotFoundText>
      <NotFoundText>Use the links above to find your way back</NotFoundText>
    </NotFoundMain>
  );
}

export default NotFound;
