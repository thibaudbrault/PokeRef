import { device } from '@/components/common/styles/Sizing';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  margin-bottom: 3rem;

  & h2 {
    margin-bottom: 0;
  }

  @media ${device.md} {
    grid-template-areas: '. search search';
  }
`;

export const StatusMoves = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;

  & a {
    display: inline-block;
    text-transform: capitalize;
    border-bottom: 1px solid transparent;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.secondary};
    }
  }
`;

export const StatsMoves = styled.td`
  & a {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0.5rem;
    & p {
      width: fit-content;
      text-transform: capitalize;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        border-bottom: 1px solid ${({ theme }) => theme.secondary};
      }
    }
  }
`;
