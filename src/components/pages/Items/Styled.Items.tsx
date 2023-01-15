import styled from 'styled-components';
import { TName } from '../../common/styles/Table';

export const TNameItems = styled(TName)`
  display: table-cell;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      margin-right: 1rem;
    }

    & a {
      cursor: pointer;
    }
  }
`;

export const TEffectItems = styled.td`
  text-transform: none;

  & .unavailable {
    opacity: 0.7;
  }
`;

export const TCategoryItems = styled.td`
  text-transform: capitalize;
`;
