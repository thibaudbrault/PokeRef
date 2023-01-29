import styled from 'styled-components';
import { LeftTitle } from '../../common/styles/Headings';

export const ModifiedLeftTitle = styled(LeftTitle)`
  margin-top: 5rem;
`;

export const MovesSection = styled.section`
  & td {
    min-width: 200px;
  }
`;

export const StatusMoves = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & a {
    margin: 0.5rem;
    display: inline-block;
    text-transform: capitalize;
    border-bottom: 1px solid transparent;
    transition: 0.3s ease-in-out;

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.secondary};
    }
  }
`;

export const TCategory = styled.td`
  & div {
    display: flex;
    align-items: center;
    justify-content: center;

    & span {
      text-transform: capitalize;
      padding-left: 0.5rem;
    }
  }
`;

export const TType = styled.td`
  & div {
    display: inline;
    padding: 0.7rem 1.5rem;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    color: #c4c4c4;

    & a {
      cursor: pointer;
      & img {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
      }
      & span {
        font-family: 'Press start 2P';
        font-size: 1rem;
        padding-left: 0.5rem;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
`;
